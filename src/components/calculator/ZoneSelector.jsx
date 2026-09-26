import { motion } from 'framer-motion';
import { ambientZones } from './calculatorData';

export default function ZoneSelector({ selectedZones, onToggleZone }) {
  const isSelected = (zoneId) => selectedZones.includes(zoneId);

  // Glow filter for selected zones
  const glowFilter = (
    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feFlood floodColor="#d4a853" floodOpacity="0.6" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );

  // LED strip animation for selected zones
  const ledStripStyle = (zoneId) => ({
    stroke: isSelected(zoneId) ? '#d4a853' : 'transparent',
    strokeWidth: isSelected(zoneId) ? 3 : 0,
    filter: isSelected(zoneId) ? 'url(#goldGlow)' : 'none',
    transition: 'all 0.4s ease',
  });

  const zoneFill = (zoneId) => isSelected(zoneId) 
    ? 'rgba(212, 168, 83, 0.12)' 
    : 'rgba(255, 255, 255, 0.02)';

  const zoneStroke = (zoneId) => isSelected(zoneId) 
    ? '#d4a853' 
    : 'rgba(255, 255, 255, 0.06)';

  return (
    <div>
      {/* SVG Car Diagram — Realistic top-down interior view */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-[380px]">
          <svg
            viewBox="0 0 340 520"
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {glowFilter}
              {/* Car body gradient */}
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="50%" stopColor="#222222" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
              {/* Seat gradient */}
              <linearGradient id="seatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="40%" stopColor="#1e1e1e" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>
              {/* Glass gradient */}
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a2a3a" />
                <stop offset="100%" stopColor="#0f1a28" />
              </linearGradient>
              {/* Console gradient */}
              <linearGradient id="consoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#252525" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
              {/* Door panel gradient */}
              <radialGradient id="doorGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#242424" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </radialGradient>
              {/* LED glow animation */}
              <linearGradient id="ledGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a853" stopOpacity="0" />
                <stop offset="50%" stopColor="#d4a853" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ═══ CAR BODY SHELL ═══ */}
            <path
              d="M80,45 
                 Q80,20 110,12 L230,12 Q260,20 260,45
                 L270,95 Q278,110 280,130
                 L282,380 Q280,400 270,420
                 L260,465 Q260,498 230,505 L110,505 Q80,498 80,465
                 L70,420 Q62,400 58,380
                 L58,130 Q60,110 68,95 Z"
              fill="url(#bodyGrad)"
              stroke="#333"
              strokeWidth="2.5"
            />

            {/* Outer body highlight lines */}
            <path
              d="M80,45 Q80,20 110,12 L230,12 Q260,20 260,45"
              fill="none" stroke="#3a3a3a" strokeWidth="1"
            />
            <path
              d="M260,465 Q260,498 230,505 L110,505 Q80,498 80,465"
              fill="none" stroke="#3a3a3a" strokeWidth="1"
            />

            {/* ═══ WINDSHIELD (front glass) ═══ */}
            <path
              d="M100,40 L240,40 Q252,43 255,58 L258,92 Q255,100 248,102 L92,102 Q85,100 82,92 L85,58 Q88,43 100,40 Z"
              fill="url(#glassGrad)"
              stroke="#2a3a4a"
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* Windshield rearview mirror */}
            <ellipse cx="170" cy="100" rx="8" ry="4" fill="#333" stroke="#444" strokeWidth="0.5" />

            {/* ═══ REAR WINDOW ═══ */}
            <path
              d="M105,415 L235,415 Q248,418 250,430 L252,455 Q250,465 240,468 L100,468 Q90,465 88,455 L90,430 Q92,418 105,415 Z"
              fill="url(#glassGrad)"
              stroke="#2a3a4a"
              strokeWidth="1.5"
              opacity="0.8"
            />

            {/* ═══ A-PILLARS ═══ */}
            <path d="M92,102 L78,130 Q75,136 76,142" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />
            <path d="M248,102 L262,130 Q265,136 264,142" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />

            {/* ═══ B-PILLARS ═══ */}
            <rect x="63" y="255" width="8" height="28" rx="3" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="0.5" />
            <rect x="269" y="255" width="8" height="28" rx="3" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="0.5" />

            {/* ═══ C-PILLARS ═══ */}
            <path d="M88,410 L72,395 Q68,390 68,385" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />
            <path d="M252,410 L268,395 Q272,390 272,385" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />

            {/* ═══ SIDE MIRRORS ═══ */}
            <ellipse cx="52" cy="112" rx="12" ry="8" fill="#1e1e1e" stroke="#333" strokeWidth="1.5" transform="rotate(-10,52,112)" />
            <ellipse cx="288" cy="112" rx="12" ry="8" fill="#1e1e1e" stroke="#333" strokeWidth="1.5" transform="rotate(10,288,112)" />

            {/* ═════════════════════════════════════════ */}
            {/* ═══ INTERACTIVE ZONES START HERE ═══ */}
            {/* ═══════════════════════════════════════════ */}

            {/* ═══ ZONE: BORD (Dashboard) ═══ */}
            <g 
              onClick={() => onToggleZone('bord')} 
              className="cursor-pointer"
              role="button"
              aria-label="Bord"
            >
              {/* Dashboard body — trapezoid following car contour */}
              <path
                d="M76,107 L264,107 Q272,112 275,125 L278,155 Q275,158 270,158 L70,158 Q65,158 62,155 L65,125 Q68,112 76,107 Z"
                fill={zoneFill('bord')}
                stroke={zoneStroke('bord')}
                strokeWidth="1"
              />
              {/* Instrument cluster */}
              <rect x="125" y="115" width="90" height="18" rx="5" fill="#111" stroke="#2a2a2a" strokeWidth="0.5" />
              {/* Gauges */}
              <circle cx="150" cy="124" r="6" fill="none" stroke="#333" strokeWidth="0.5" />
              <circle cx="170" cy="124" r="6" fill="none" stroke="#333" strokeWidth="0.5" />
              <circle cx="190" cy="124" r="6" fill="none" stroke="#333" strokeWidth="0.5" />
              {/* Steering wheel */}
              <circle cx="140" cy="144" r="18" fill="none" stroke="#3a3a3a" strokeWidth="2.5" />
              <circle cx="140" cy="144" r="6" fill="#222" stroke="#3a3a3a" strokeWidth="1" />
              {/* Steering wheel spokes */}
              <line x1="140" y1="126" x2="140" y2="133" stroke="#3a3a3a" strokeWidth="1.5" />
              <line x1="122" y1="144" x2="131" y2="144" stroke="#3a3a3a" strokeWidth="1.5" />
              <line x1="149" y1="144" x2="158" y2="144" stroke="#3a3a3a" strokeWidth="1.5" />
              {/* Infotainment screen */}
              <rect x="178" y="136" width="55" height="22" rx="3" fill="#0a0e16" stroke="#2a2a2a" strokeWidth="0.5" />
              {/* A/C vents */}
              <rect x="88" y="118" width="18" height="6" rx="2" fill="#151515" stroke="#2a2a2a" strokeWidth="0.3" />
              <rect x="235" y="118" width="18" height="6" rx="2" fill="#151515" stroke="#2a2a2a" strokeWidth="0.3" />
              {/* LED strip on dashboard — follows bottom edge */}
              <path
                d="M70,158 L270,158"
                fill="none"
                style={ledStripStyle('bord')}
                strokeLinecap="round"
              />
              {/* Label */}
              <text
                x="170" y="175"
                fill={isSelected('bord') ? '#d4a853' : '#666'}
                fontSize="10" fontFamily="Inter,sans-serif" fontWeight={isSelected('bord') ? '600' : '400'}
                textAnchor="middle"
              >
                BORD
              </text>
            </g>

            {/* ═══ ZONE: CONSOLĂ CENTRALĂ ═══ */}
            <g 
              onClick={() => onToggleZone('consola')} 
              className="cursor-pointer"
              role="button"
              aria-label="Consolă centrală"
            >
              {/* Console body */}
              <rect
                x="145" y="180" width="50" height="185" rx="6"
                fill={zoneFill('consola')}
                stroke={zoneStroke('consola')}
                strokeWidth="1"
              />
              {/* Console surface details */}
              <rect x="150" y="185" width="40" height="5" rx="2" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.3" />
              {/* Gear shifter */}
              <rect x="158" y="197" width="24" height="30" rx="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
              <rect x="163" y="202" width="14" height="12" rx="3" fill="#222" stroke="#333" strokeWidth="0.5" />
              {/* Cup holders */}
              <circle cx="160" cy="245" r="8" fill="#111" stroke="#2a2a2a" strokeWidth="0.5" />
              <circle cx="180" cy="245" r="8" fill="#111" stroke="#2a2a2a" strokeWidth="0.5" />
              {/* Armrest */}
              <rect x="150" y="265" width="40" height="45" rx="5" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="0.5" />
              {/* Console rear section */}
              <rect x="155" y="320" width="30" height="40" rx="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.3" />
              {/* LED strips on console edges */}
              <line
                x1="145" y1="185" x2="145" y2="365"
                style={ledStripStyle('consola')}
                strokeLinecap="round"
              />
              <line
                x1="195" y1="185" x2="195" y2="365"
                style={ledStripStyle('consola')}
                strokeLinecap="round"
              />
              {/* Label */}
              <text
                x="170" y="375"
                fill={isSelected('consola') ? '#d4a853' : '#555'}
                fontSize="8" fontFamily="Inter,sans-serif" fontWeight={isSelected('consola') ? '600' : '400'}
                textAnchor="middle"
              >
                CONSOLĂ
              </text>
            </g>

            {/* ═══ FRONT SEATS ═══ */}
            {/* Driver seat */}
            <path
              d="M82,185 Q82,178 90,175 L132,175 Q140,178 140,185 L140,260 Q140,268 132,270 L90,270 Q82,268 82,260 Z"
              fill="url(#seatGrad)" stroke="#333" strokeWidth="1"
            />
            {/* Seat bolster lines */}
            <path d="M95,180 L95,265" stroke="#2a2a2a" strokeWidth="0.5" />
            <path d="M127,180 L127,265" stroke="#2a2a2a" strokeWidth="0.5" />
            {/* Headrest */}
            <rect x="98" y="172" width="26" height="12" rx="5" fill="#262626" stroke="#333" strokeWidth="0.5" />

            {/* Passenger seat */}
            <path
              d="M200,185 Q200,178 208,175 L250,175 Q258,178 258,185 L258,260 Q258,268 250,270 L208,270 Q200,268 200,260 Z"
              fill="url(#seatGrad)" stroke="#333" strokeWidth="1"
            />
            <path d="M213,180 L213,265" stroke="#2a2a2a" strokeWidth="0.5" />
            <path d="M245,180 L245,265" stroke="#2a2a2a" strokeWidth="0.5" />
            <rect x="216" y="172" width="26" height="12" rx="5" fill="#262626" stroke="#333" strokeWidth="0.5" />

            {/* ═══ REAR SEATS ═══ */}
            {/* Rear left */}
            <path
              d="M78,315 Q78,308 86,305 L140,305 Q145,308 145,315 L145,385 Q145,392 140,395 L86,395 Q78,392 78,385 Z"
              fill="url(#seatGrad)" stroke="#333" strokeWidth="1"
            />
            <path d="M93,310 L93,390" stroke="#2a2a2a" strokeWidth="0.5" />
            <path d="M128,310 L128,390" stroke="#2a2a2a" strokeWidth="0.5" />
            <rect x="95" y="302" width="28" height="10" rx="4" fill="#262626" stroke="#333" strokeWidth="0.5" />

            {/* Rear right */}
            <path
              d="M195,315 Q195,308 200,305 L254,305 Q262,308 262,315 L262,385 Q262,392 254,395 L200,395 Q195,392 195,385 Z"
              fill="url(#seatGrad)" stroke="#333" strokeWidth="1"
            />
            <path d="M212,310 L212,390" stroke="#2a2a2a" strokeWidth="0.5" />
            <path d="M247,310 L247,390" stroke="#2a2a2a" strokeWidth="0.5" />
            <rect x="217" y="302" width="28" height="10" rx="4" fill="#262626" stroke="#333" strokeWidth="0.5" />

            {/* ═══ ZONE: UȘI FAȚĂ ═══ */}
            <g 
              onClick={() => onToggleZone('usi-fata')} 
              className="cursor-pointer"
              role="button"
              aria-label="Uși față"
            >
              {/* Left front door panel — follows car contour */}
              <path
                d="M68,145 Q63,145 60,150 L58,160 L58,253 Q58,258 60,258 L75,258 Q80,255 80,250 L80,152 Q80,147 76,145 Z"
                fill={zoneFill('usi-fata')}
                stroke={zoneStroke('usi-fata')}
                strokeWidth="1"
              />
              {/* Door handle */}
              <rect x="59" y="188" width="14" height="4" rx="2" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="0.3" />
              {/* Door armrest */}
              <rect x="58" y="205" width="16" height="25" rx="3" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="0.3" />
              {/* Speaker */}
              <circle cx="66" cy="242" r="6" fill="#151515" stroke="#2a2a2a" strokeWidth="0.3" />
              <circle cx="66" cy="242" r="3" fill="#111" stroke="#222" strokeWidth="0.3" />

              {/* Right front door panel — mirrors left, follows car contour */}
              <path
                d="M272,145 Q277,145 280,150 L282,160 L282,253 Q282,258 280,258 L265,258 Q260,255 260,250 L260,152 Q260,147 264,145 Z"
                fill={zoneFill('usi-fata')}
                stroke={zoneStroke('usi-fata')}
                strokeWidth="1"
              />
              <rect x="267" y="188" width="14" height="4" rx="2" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="0.3" />
              <rect x="266" y="205" width="16" height="25" rx="3" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="0.3" />
              <circle cx="274" cy="242" r="6" fill="#151515" stroke="#2a2a2a" strokeWidth="0.3" />
              <circle cx="274" cy="242" r="3" fill="#111" stroke="#222" strokeWidth="0.3" />

              {/* LED strips on door panels */}
              <line
                x1="58" y1="200" x2="58" y2="250"
                style={ledStripStyle('usi-fata')}
                strokeLinecap="round"
              />
              <line
                x1="282" y1="200" x2="282" y2="250"
                style={ledStripStyle('usi-fata')}
                strokeLinecap="round"
              />

              {/* Labels */}
              <text
                x="42" y="200"
                fill={isSelected('usi-fata') ? '#d4a853' : '#555'}
                fontSize="7" fontFamily="Inter,sans-serif" fontWeight={isSelected('usi-fata') ? '600' : '400'}
                textAnchor="middle"
                transform="rotate(-90,42,200)"
              >
                UȘĂ FAȚĂ
              </text>
              <text
                x="298" y="200"
                fill={isSelected('usi-fata') ? '#d4a853' : '#555'}
                fontSize="7" fontFamily="Inter,sans-serif" fontWeight={isSelected('usi-fata') ? '600' : '400'}
                textAnchor="middle"
                transform="rotate(90,298,200)"
              >
                UȘĂ FAȚĂ
              </text>
            </g>

            {/* ═══ ZONE: UȘI SPATE ═══ */}
            <g 
              onClick={() => onToggleZone('usi-spate')} 
              className="cursor-pointer"
              role="button"
              aria-label="Uși spate"
            >
              {/* Left rear door panel — follows car body curve towards rear */}
              <path
                d="M58,285 Q58,283 60,283 L75,283 Q80,285 80,290 L80,390 Q80,395 75,398 L68,398 Q63,396 61,390 L58,380 Q58,370 58,350 Z"
                fill={zoneFill('usi-spate')}
                stroke={zoneStroke('usi-spate')}
                strokeWidth="1"
              />
              <rect x="59" y="330" width="14" height="4" rx="2" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="0.3" />
              <rect x="58" y="345" width="16" height="22" rx="3" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="0.3" />
              <circle cx="66" cy="378" r="5" fill="#151515" stroke="#2a2a2a" strokeWidth="0.3" />

              {/* Right rear door panel — mirrors left, follows car body curve */}
              <path
                d="M282,285 Q282,283 280,283 L265,283 Q260,285 260,290 L260,390 Q260,395 265,398 L272,398 Q277,396 279,390 L282,380 Q282,370 282,350 Z"
                fill={zoneFill('usi-spate')}
                stroke={zoneStroke('usi-spate')}
                strokeWidth="1"
              />
              <rect x="267" y="330" width="14" height="4" rx="2" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="0.3" />
              <rect x="266" y="345" width="16" height="22" rx="3" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="0.3" />
              <circle cx="274" cy="378" r="5" fill="#151515" stroke="#2a2a2a" strokeWidth="0.3" />

              {/* LED strips */}
              <line
                x1="58" y1="340" x2="58" y2="380"
                style={ledStripStyle('usi-spate')}
                strokeLinecap="round"
              />
              <line
                x1="282" y1="340" x2="282" y2="380"
                style={ledStripStyle('usi-spate')}
                strokeLinecap="round"
              />

              {/* Labels */}
              <text
                x="42" y="340"
                fill={isSelected('usi-spate') ? '#d4a853' : '#555'}
                fontSize="7" fontFamily="Inter,sans-serif" fontWeight={isSelected('usi-spate') ? '600' : '400'}
                textAnchor="middle"
                transform="rotate(-90,42,340)"
              >
                UȘĂ SPATE
              </text>
              <text
                x="298" y="340"
                fill={isSelected('usi-spate') ? '#d4a853' : '#555'}
                fontSize="7" fontFamily="Inter,sans-serif" fontWeight={isSelected('usi-spate') ? '600' : '400'}
                textAnchor="middle"
                transform="rotate(90,298,340)"
              >
                UȘĂ SPATE
              </text>
            </g>

            {/* ═══ ZONE: SUB SCAUNE ═══ */}
            <g 
              onClick={() => onToggleZone('sub-scaune')} 
              className="cursor-pointer"
              role="button"
              aria-label="Sub scaune"
            >
              {/* Footwell in front of front seats */}
              <rect
                x="82" y="160" width="56" height="14" rx="3"
                fill={zoneFill('sub-scaune')}
                stroke={zoneStroke('sub-scaune')}
                strokeWidth="1"
              />
              <text
                x="110" y="170"
                fill={isSelected('sub-scaune') ? '#d4a853' : '#555'}
                fontSize="6" fontFamily="Inter,sans-serif" fontWeight={isSelected('sub-scaune') ? '600' : '400'}
                textAnchor="middle"
              >
                SUB SCAUNE
              </text>

              <rect
                x="202" y="160" width="56" height="14" rx="3"
                fill={zoneFill('sub-scaune')}
                stroke={zoneStroke('sub-scaune')}
                strokeWidth="1"
              />
              <text
                x="230" y="170"
                fill={isSelected('sub-scaune') ? '#d4a853' : '#555'}
                fontSize="6" fontFamily="Inter,sans-serif" fontWeight={isSelected('sub-scaune') ? '600' : '400'}
                textAnchor="middle"
              >
                SUB SCAUNE
              </text>

              {/* Footwell in front of rear seats */}
              <rect
                x="78" y="275" width="62" height="14" rx="3"
                fill={zoneFill('sub-scaune')}
                stroke={zoneStroke('sub-scaune')}
                strokeWidth="1"
              />
              <text
                x="109" y="285"
                fill={isSelected('sub-scaune') ? '#d4a853' : '#555'}
                fontSize="6" fontFamily="Inter,sans-serif" fontWeight={isSelected('sub-scaune') ? '600' : '400'}
                textAnchor="middle"
              >
                SUB SCAUNE
              </text>

              <rect
                x="200" y="275" width="62" height="14" rx="3"
                fill={zoneFill('sub-scaune')}
                stroke={zoneStroke('sub-scaune')}
                strokeWidth="1"
              />
              <text
                x="231" y="285"
                fill={isSelected('sub-scaune') ? '#d4a853' : '#555'}
                fontSize="6" fontFamily="Inter,sans-serif" fontWeight={isSelected('sub-scaune') ? '600' : '400'}
                textAnchor="middle"
              >
                SUB SCAUNE
              </text>

              {/* LED strips — front footwell */}
              <line
                x1="85" y1="168" x2="135" y2="168"
                style={ledStripStyle('sub-scaune')}
                strokeLinecap="round"
              />
              <line
                x1="205" y1="168" x2="255" y2="168"
                style={ledStripStyle('sub-scaune')}
                strokeLinecap="round"
              />
              {/* LED strips — rear footwell */}
              <line
                x1="82" y1="283" x2="137" y2="283"
                style={ledStripStyle('sub-scaune')}
                strokeLinecap="round"
              />
              <line
                x1="203" y1="283" x2="258" y2="283"
                style={ledStripStyle('sub-scaune')}
                strokeLinecap="round"
              />
            </g>

          </svg>

          {/* Interactive hint overlay */}
          <div className="text-center mt-4 mb-6">
            <p className="text-light-muted text-xs opacity-60">Apasă pe zonele din mașină</p>
          </div>
        </div>
      </div>

      {/* Zone Checkboxes List (always visible, good for mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ambientZones.map((zone) => (
          <motion.button
            key={zone.id}
            onClick={() => onToggleZone(zone.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 text-left cursor-pointer ${
              isSelected(zone.id)
                ? 'border-gold bg-gold/10'
                : 'border-dark-border bg-dark-card hover:border-neutral-600'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                isSelected(zone.id) ? 'border-gold bg-gold' : 'border-neutral-500'
              }`}
            >
              {isSelected(zone.id) && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  viewBox="0 0 24 24"
                  className="w-3 h-3 text-dark"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </div>
            <div className="flex-1">
              <span className={`font-medium text-sm ${isSelected(zone.id) ? 'text-gold' : 'text-light'}`}>
                {zone.name}
              </span>
              <p className="text-light-muted text-xs">{zone.description}</p>
            </div>
            <span className={`text-sm font-semibold whitespace-nowrap ${isSelected(zone.id) ? 'text-gold' : 'text-light-muted'}`}>
              {zone.price} RON
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
