// Full rebuild — no Leaflet, pure MapLibre (mapcn pattern)

import { useState, useEffect, useCallback, useRef } from 'react';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { SafetyNote } from '@/components/ui/SafetyNote';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/utils/cn';
import { Map as MlMap, Marker, Popup, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// ── Types ──
interface MedicalFacility {
  id: number;
  name: string;
  type: 'hospital' | 'clinic' | 'doctor' | 'pharmacy' | 'laboratory';
  specialty: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  distance: number; // km
}

interface OverpassElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

// ── Translations ──
const T: Record<string, Record<string, string>> = {
  title: {
    ar: 'لقاي طبيب قريب منك', fr: 'Trouvez un médecin près de chez vous',
    en: 'Find a doctor near you', es: 'Encuentra un médico cerca de ti',
    de: 'Finden Sie einen Arzt in Ihrer Nähe', ru: 'Найдите врача рядом',
    pt: 'Encontre um médico perto de você',
  },
  subtitle: {
    ar: 'أطباء ومستشفيات ومراكز صحية قريبين منك',
    fr: 'Médecins, hôpitaux et centres de santé à proximité',
    en: 'Doctors, hospitals and health centers nearby',
    es: 'Médicos, hospitales y centros de salud cercanos',
    de: 'Ärzte, Krankenhäuser und Gesundheitszentren in der Nähe',
    ru: 'Врачи, больницы и медцентры поблизости',
    pt: 'Médicos, hospitais e centros de saúde próximos',
  },
  searchPlaceholder: {
    ar: 'ابحثي عن مدينة...', fr: 'Rechercher une ville...',
    en: 'Search for a city...', es: 'Buscar una ciudad...',
    de: 'Stadt suchen...', ru: 'Поиск города...', pt: 'Pesquisar cidade...',
  },
  detectLocation: {
    ar: '📍 حددي موقعك', fr: '📍 Détecter ma position',
    en: '📍 Detect my location', es: '📍 Detectar ubicación',
    de: '📍 Standort erkennen', ru: '📍 Определить местоположение',
    pt: '📍 Detectar localização',
  },
  loading: {
    ar: '⏳ كنقلّبو على أطباء قريبين...', fr: '⏳ Recherche en cours...',
    en: '⏳ Searching for nearby doctors...', es: '⏳ Buscando médicos cercanos...',
    de: '⏳ Suche nach Ärzten...', ru: '⏳ Поиск ближайших врачей...',
    pt: '⏳ Procurando médicos próximos...',
  },
  noResults: {
    ar: 'ما لقيناش مرافق طبية. زيدي المسافة أو بدّلي المدينة.',
    fr: 'Aucun résultat. Élargissez la zone ou changez de ville.',
    en: 'No results found. Try expanding the radius or changing city.',
    es: 'Sin resultados. Amplíe el radio o cambie de ciudad.',
    de: 'Keine Ergebnisse. Erweitern Sie den Radius oder ändern Sie die Stadt.',
    ru: 'Ничего не найдено. Расширьте радиус или смените город.',
    pt: 'Nenhum resultado. Amplie o raio ou mude de cidade.',
  },
  km: {
    ar: 'كم', fr: 'km', en: 'km', es: 'km', de: 'km', ru: 'км', pt: 'km',
  },
  call: {
    ar: '📞 اتصلي', fr: '📞 Appeler', en: '📞 Call',
    es: '📞 Llamar', de: '📞 Anrufen', ru: '📞 Позвонить', pt: '📞 Ligar',
  },
  filterAll: { ar: 'الكل', fr: 'Tous', en: 'All', es: 'Todos', de: 'Alle', ru: 'Все', pt: 'Todos' },
  filterHospital: { ar: 'مستشفيات', fr: 'Hôpitaux', en: 'Hospitals', es: 'Hospitales', de: 'Krankenhäuser', ru: 'Больницы', pt: 'Hospitais' },
  filterClinic: { ar: 'عيادات', fr: 'Cliniques', en: 'Clinics', es: 'Clínicas', de: 'Kliniken', ru: 'Клиники', pt: 'Clínicas' },
  filterDoctor: { ar: 'أطباء', fr: 'Médecins', en: 'Doctors', es: 'Médicos', de: 'Ärzte', ru: 'Врачи', pt: 'Médicos' },
  filterPharmacy: { ar: 'صيدليات', fr: 'Pharmacies', en: 'Pharmacies', es: 'Farmacias', de: 'Apotheken', ru: 'Аптеки', pt: 'Farmácias' },
  radius: { ar: 'المسافة', fr: 'Rayon', en: 'Radius', es: 'Radio', de: 'Radius', ru: 'Радиус', pt: 'Raio' },
  found: { ar: 'مرفق طبي', fr: 'établissements trouvés', en: 'facilities found', es: 'centros encontrados', de: 'Einrichtungen gefunden', ru: 'учреждений найдено', pt: 'estabelecimentos encontrados' },
  geoUnsupported: {
    ar: 'المتصفح ما كيدعمش تحديد الموقع',
    fr: "La géolocalisation n'est pas prise en charge",
    en: 'Geolocation is not supported',
    es: 'La geolocalización no es compatible',
    de: 'Geolokalisierung wird nicht unterstützt',
    ru: 'Геолокация не поддерживается',
    pt: 'A geolocalização não é suportada',
  },
  geoFailed: {
    ar: 'ما قدرناش نحددو موقعك. دخلي اسم المدينة.',
    fr: 'Impossible de détecter votre position. Saisissez une ville.',
    en: 'Could not detect your location. Enter a city name.',
    es: 'No se pudo detectar su ubicación. Ingrese una ciudad.',
    de: 'Standort konnte nicht erkannt werden. Geben Sie eine Stadt ein.',
    ru: 'Не удалось определить местоположение. Введите город.',
    pt: 'Não foi possível detectar sua localização. Digite uma cidade.',
  },
  cityNotFound: {
    ar: 'ما لقيناش هاد المدينة',
    fr: 'Ville introuvable',
    en: 'City not found',
    es: 'Ciudad no encontrada',
    de: 'Stadt nicht gefunden',
    ru: 'Город не найден',
    pt: 'Cidade não encontrada',
  },
};

// ── Facility type colors ──
const TYPE_COLORS: Record<string, string> = {
  hospital: 'rgb(var(--risk-high))',
  clinic: 'rgb(var(--accent))',
  doctor: 'rgb(var(--info))',
  pharmacy: 'rgb(var(--calm))',
  laboratory: 'rgb(var(--warn))',
};

const TYPE_ICONS: Record<string, string> = {
  hospital: '🏥',
  clinic: '🩺',
  doctor: '👩‍⚕️',
  pharmacy: '💊',
  laboratory: '🔬',
};

// ── Overpass API: find medical facilities ──
async function searchMedicalFacilities(
  lat: number, lng: number, radiusKm: number,
): Promise<MedicalFacility[]> {
  const radiusM = radiusKm * 1000;
  const query = `
    [out:json][timeout:15];
    (
      node["amenity"="hospital"](around:${radiusM},${lat},${lng});
      node["amenity"="clinic"](around:${radiusM},${lat},${lng});
      node["amenity"="doctors"](around:${radiusM},${lat},${lng});
      node["amenity"="pharmacy"](around:${radiusM},${lat},${lng});
      node["healthcare"="doctor"](around:${radiusM},${lat},${lng});
      node["healthcare"="clinic"](around:${radiusM},${lat},${lng});
      node["healthcare"="hospital"](around:${radiusM},${lat},${lng});
      node["healthcare"="centre"](around:${radiusM},${lat},${lng});
      node["healthcare"="laboratory"](around:${radiusM},${lat},${lng});
      way["amenity"="hospital"](around:${radiusM},${lat},${lng});
      way["amenity"="clinic"](around:${radiusM},${lat},${lng});
    );
    out body center;
  `;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const data = await res.json();

  return (data.elements ?? [])
    .filter((el: OverpassElement) => (el.lat && el.lon) || el.center)
    .map((el: OverpassElement) => {
      const elLat = el.lat || el.center?.lat;
      const elLng = el.lon || el.center?.lon;
      const amenity = el.tags?.amenity || el.tags?.healthcare || 'doctor';

      let type: MedicalFacility['type'] = 'doctor';
      if (amenity === 'hospital') type = 'hospital';
      else if (amenity === 'clinic' || amenity === 'centre') type = 'clinic';
      else if (amenity === 'pharmacy') type = 'pharmacy';
      else if (amenity === 'laboratory') type = 'laboratory';

      const specialty = el.tags?.['healthcare:speciality'] ||
                        el.tags?.['medical_system:specialty'] || '';

      const dist = haversineDistance(lat, lng, elLat!, elLng!);

      return {
        id: el.id,
        name: el.tags?.name || el.tags?.['name:ar'] || el.tags?.['name:fr'] ||
              (type === 'hospital' ? 'Hospital' : type === 'pharmacy' ? 'Pharmacy' : 'Medical Facility'),
        type,
        specialty,
        lat: elLat,
        lng: elLng,
        address: [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ') || '',
        phone: el.tags?.phone || el.tags?.['contact:phone'] || '',
        distance: Math.round(dist * 10) / 10,
      } as MedicalFacility;
    })
    .sort((a: MedicalFacility, b: MedicalFacility) => a.distance - b.distance);
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Geocoding with Nominatim (free) ──
async function geocodeCity(query: string): Promise<{ lat: number; lng: number; name: string } | null> {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
  const data = await res.json();
  if (data.length === 0) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: data[0].display_name.split(',')[0] };
}

// ── Main Component ──
export default function DoctorsPage() {
  const { lang, t: tr } = useLanguage();
  const t = (key: string) => T[key]?.[lang] || T[key]?.en || key;

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const userMarkerRef = useRef<Marker | null>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cityName, setCityName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [facilities, setFacilities] = useState<MedicalFacility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<MedicalFacility[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [radius, setRadius] = useState(5);
  const [selectedFacility, setSelectedFacility] = useState<MedicalFacility | null>(null);
  const [locationError, setLocationError] = useState('');

  // Autocomplete suggestions (Nominatim), nearest-first when location is known.
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string; type: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Drop / move the "you are here" marker (single instance) ──
  const setUserMarker = useCallback((loc: { lat: number; lng: number }) => {
    if (!mapRef.current) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([loc.lng, loc.lat]);
      return;
    }
    const el = document.createElement('div');
    el.innerHTML = '📍';
    el.style.fontSize = '28px';
    el.style.cursor = 'pointer';
    el.setAttribute('aria-label', 'Your location');
    userMarkerRef.current = new Marker({ element: el }).setLngLat([loc.lng, loc.lat]).addTo(mapRef.current);
  }, []);

  // ── Search nearby facilities ──
  const searchNearby = useCallback(async (lat: number, lng: number, rad: number) => {
    setLoading(true);
    try {
      const results = await searchMedicalFacilities(lat, lng, rad);
      setFacilities(results);
      setFilteredFacilities(results);
    } catch {
      setFacilities([]);
      setFilteredFacilities([]);
    }
    setLoading(false);
  }, []);

  // ── Initialize map ──
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new MlMap({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [0, 30],
      zoom: 2,
    });

    map.addControl(new NavigationControl(), 'top-left');
    mapRef.current = map;

    return () => { map.remove(); mapRef.current = null; userMarkerRef.current = null; };
  }, []);

  // ── Detect user location ──
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError(t('geoUnsupported'));
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLocationError('');

        // Reverse geocode to a precise label (zoom 18 = building/street level).
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${loc.lat}&lon=${loc.lng}&format=json&zoom=18&addressdetails=1`,
            { headers: { 'Accept-Language': lang } },
          );
          const data = await res.json();
          const city = data.address?.city || data.address?.town ||
                       data.address?.village || data.address?.suburb ||
                       data.address?.municipality || '';
          const street = data.address?.road || '';
          setCityName(street ? `${street}, ${city}` : city);
        } catch {
          /* reverse geocode is best-effort */
        }

        // Closer view. Distances stay based on the RAW GPS fix (loc), never the city center.
        mapRef.current?.flyTo({ center: [loc.lng, loc.lat], zoom: 14 });
        setUserMarker(loc);
        await searchNearby(loc.lat, loc.lng, radius);
      },
      () => {
        setLoading(false);
        setLocationError(t('geoFailed'));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, radius, searchNearby, setUserMarker]);

  // ── Auto-detect location on mount ──
  useEffect(() => {
    detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Close the autocomplete dropdown on any outside click ──
  useEffect(() => {
    const close = () => setShowSuggestions(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // ── City search (search button / Enter) ──
  const handleCitySearch = async () => {
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    setLoading(true);
    const geo = await geocodeCity(searchQuery);
    if (geo) {
      const loc = { lat: geo.lat, lng: geo.lng };
      setUserLocation(loc);
      setCityName(geo.name);
      setLocationError('');
      mapRef.current?.flyTo({ center: [geo.lng, geo.lat], zoom: 14 });
      setUserMarker(loc);
      await searchNearby(geo.lat, geo.lng, radius);
    } else {
      setLocationError(t('cityNotFound'));
      setLoading(false);
    }
  };

  // ── Smart autocomplete: debounced Nominatim lookup, nearest-first ──
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      try {
        // Bias toward the user's area (does not exclude far results — bounded=0).
        const bias = userLocation
          ? `&viewbox=${userLocation.lng - 2},${userLocation.lat - 2},${userLocation.lng + 2},${userLocation.lat + 2}&bounded=0`
          : '';
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=8&addressdetails=1${bias}`,
          { headers: { 'Accept-Language': lang } },
        );
        const data = await res.json();
        const sorted = userLocation
          ? [...data].sort(
              (a: NominatimResult, b: NominatimResult) =>
                haversineDistance(userLocation.lat, userLocation.lng, parseFloat(a.lat), parseFloat(a.lon)) -
                haversineDistance(userLocation.lat, userLocation.lng, parseFloat(b.lat), parseFloat(b.lon)),
            )
          : data;
        setSuggestions(sorted);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  };

  const selectSuggestion = async (s: NominatimResult) => {
    const lat = parseFloat(s.lat);
    const lng = parseFloat(s.lon);
    const label = s.display_name.split(',').slice(0, 2).join(',').trim();
    setUserLocation({ lat, lng });
    setCityName(label);
    setSearchQuery(label);
    setShowSuggestions(false);
    setLocationError('');
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 14 });
    setUserMarker({ lat, lng });
    await searchNearby(lat, lng, radius);
  };

  // ── Update map markers ──
  const updateMapMarkers = useCallback((facs: MedicalFacility[]) => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (!mapRef.current) return;

    facs.forEach((fac) => {
      const el = document.createElement('div');
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.borderRadius = '50%';
      el.style.background = TYPE_COLORS[fac.type] || 'rgb(var(--accent))';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = '16px';
      el.style.cursor = 'pointer';
      el.textContent = TYPE_ICONS[fac.type] || '🩺';
      el.setAttribute('aria-label', fac.name);

      const popup = new Popup({ offset: 20, closeButton: false }).setHTML(`
        <div style="padding:8px;font-family:inherit;min-width:180px">
          <strong style="font-size:14px;color:rgb(var(--ink))">${fac.name}</strong><br/>
          <span style="font-size:11px;color:${TYPE_COLORS[fac.type]};font-weight:600">${TYPE_ICONS[fac.type]} ${fac.type}${fac.specialty ? ' · ' + fac.specialty : ''}</span><br/>
          <span style="font-size:11px;color:rgb(var(--muted))">${fac.distance} ${t('km')}</span>
          ${fac.address ? `<br/><span style="font-size:11px;color:rgb(var(--muted))">📍 ${fac.address}</span>` : ''}
          ${fac.phone ? `<br/><a href="tel:${fac.phone}" style="font-size:12px;color:rgb(var(--accent-text));font-weight:600">📞 ${fac.phone}</a>` : ''}
        </div>
      `);

      const marker = new Marker({ element: el })
        .setLngLat([fac.lng, fac.lat])
        .setPopup(popup)
        .addTo(mapRef.current!);

      el.addEventListener('click', () => setSelectedFacility(fac));
      markersRef.current.push(marker);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // ── Filter ──
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredFacilities(facilities);
    } else {
      setFilteredFacilities(facilities.filter((f) => f.type === activeFilter));
    }
  }, [activeFilter, facilities]);

  useEffect(() => {
    updateMapMarkers(filteredFacilities);
  }, [filteredFacilities, updateMapMarkers]);

  // ── Radius change ──
  const handleRadiusChange = async (newRadius: number) => {
    setRadius(newRadius);
    if (userLocation) {
      await searchNearby(userLocation.lat, userLocation.lng, newRadius);
    }
  };

  const filters = [
    { key: 'all', label: t('filterAll'), icon: '🏥' },
    { key: 'hospital', label: t('filterHospital'), icon: '🏥' },
    { key: 'clinic', label: t('filterClinic'), icon: '🩺' },
    { key: 'doctor', label: t('filterDoctor'), icon: '👩‍⚕️' },
    { key: 'pharmacy', label: t('filterPharmacy'), icon: '💊' },
  ];

  return (
    <div className="ds-scope mx-auto w-full max-w-6xl px-4 pb-24 pt-6">
      {/* Header */}
      <h1 className="text-center text-h2 font-bold text-accent-text">
        🩺 {t('title')}
      </h1>
      <p className="mb-5 mt-1 text-center text-caption text-muted">
        {t('subtitle')}
      </p>

      {/* These listings are unvetted OpenStreetMap data. Presenting a list of
          named doctors with no caveat reads as a vetted referral — a claim we
          have not earned and cannot stand behind. Say so, above the results. */}
      <div className="mb-4">
        <SafetyNote variant="care">{tr.doctors.notVerified}</SafetyNote>
      </div>

      {/* Location bar */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={detectLocation}
          className="shrink-0 whitespace-nowrap rounded-xl bg-primary-600 px-4 py-2.5 text-caption font-semibold text-white"
        >
          {t('detectLocation')}
        </button>
        <div className="relative min-w-[200px] flex-1" onClick={(e) => e.stopPropagation()}>
          <div className="flex">
            <input
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onKeyDown={(e) => { if (e.key === 'Enter') { setShowSuggestions(false); handleCitySearch(); } }}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
              className="min-w-0 flex-1 rounded-l-xl border-2 border-line-control bg-card px-3.5 py-2.5 text-caption text-ink outline-none"
            />
            <button
              type="button"
              onClick={handleCitySearch}
              aria-label={t('searchPlaceholder')}
              className="rounded-r-xl border-2 border-l-0 border-line-control bg-sunken px-3.5 py-2.5 text-base"
            >
              🔍
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-[100] max-h-[300px] overflow-y-auto rounded-b-xl border border-t-0 border-line-control bg-card shadow-petal-lg">
              {suggestions.map((s, i) => {
                const parts = s.display_name.split(',');
                const mainName = parts[0]?.trim();
                const subName = parts.slice(1, 3).join(',').trim();
                const dist = userLocation
                  ? Math.round(haversineDistance(userLocation.lat, userLocation.lng, parseFloat(s.lat), parseFloat(s.lon)))
                  : null;
                return (
                  <div
                    key={i}
                    onClick={() => selectSuggestion(s)}
                    className="flex cursor-pointer items-center justify-between border-b border-line px-3.5 py-2.5 last:border-b-0 hover:bg-accent-soft"
                  >
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        📍 {mainName}
                      </div>
                      <div className="text-[11px] text-muted">{subName}</div>
                    </div>
                    {dist !== null && (
                      <span className="shrink-0 text-[11px] font-semibold text-accent-text">
                        ~{dist} {t('km')}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* City name + radius */}
      {cityName && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-body-sm font-semibold text-ink">
            📍 {cityName} · {filteredFacilities.length} {t('found')}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted">{t('radius')}:</span>
            {[5, 10, 20, 50].map((rad) => (
              <button
                type="button"
                key={rad}
                onClick={() => handleRadiusChange(rad)}
                className={cn(
                  'rounded-lg px-2.5 py-1 text-[12px] font-semibold',
                  radius === rad
                    ? 'bg-primary-600 text-white'
                    : 'border border-line-control bg-card text-muted',
                )}
              >
                {rad}{t('km')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            type="button"
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              'flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold',
              activeFilter === f.key
                ? 'bg-primary-600 text-white'
                : 'border border-line-control bg-card text-muted',
            )}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {locationError && (
        <div className="mb-3 rounded-xl border border-attention/30 bg-attention-soft px-4 py-2.5 text-caption text-attention-text">
          {locationError}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-5 text-center text-caption text-accent-text">
          {t('loading')}
        </div>
      )}

      {/* Map */}
      <div
        ref={mapContainer}
        role="region"
        aria-label={t('title')}
        className="mb-5 h-[55vh] w-full overflow-hidden rounded-2xl border-2 border-line shadow-petal"
      />

      {/* No results */}
      {!loading && facilities.length === 0 && userLocation && (
        <div className="py-6 text-center text-caption text-muted">
          {t('noResults')}
        </div>
      )}

      {/* Facility cards list */}
      <div className="flex flex-col gap-3">
        {filteredFacilities.slice(0, 20).map((fac) => (
          <div
            key={fac.id}
            onClick={() => {
              setSelectedFacility(fac);
              mapRef.current?.flyTo({ center: [fac.lng, fac.lat], zoom: 16 });
            }}
            className={cn(
              'flex cursor-pointer items-center gap-3.5 rounded-2xl px-4 py-3.5 transition',
              selectedFacility?.id === fac.id
                ? 'border-2 border-primary-500 bg-accent-soft'
                : 'border border-line bg-card shadow-petal',
            )}
          >
            {/* Type icon */}
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sunken text-[22px]">
              {TYPE_ICONS[fac.type]}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 text-sm font-semibold text-ink">
                {fac.name}
              </div>
              <div className="text-[11px] font-semibold" style={{ color: TYPE_COLORS[fac.type] }}>
                {fac.type}{fac.specialty ? ' · ' + fac.specialty : ''}
              </div>
              {fac.address && (
                <div className="mt-0.5 text-[11px] text-muted">📍 {fac.address}</div>
              )}
            </div>

            {/* Distance + call */}
            <div className="shrink-0 text-center">
              <div className="text-sm font-bold text-accent-text">
                {fac.distance} {t('km')}
              </div>
              {fac.phone && (
                <a
                  href={`tel:${fac.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 block text-[11px] font-semibold text-calm-text no-underline"
                >
                  {t('call')}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* HARD RULE 2: this page routes a woman toward care. */}
      <div className="mt-6">
        <Disclaimer />
      </div>
    </div>
  );
}
