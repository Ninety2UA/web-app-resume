'use client'

import { motion } from 'framer-motion'
import { roleNodes } from '@/data/skills'

const colorMap: Record<string, string> = {
  'Henkel': '#E6B35A',
  "L'Oréal": '#E07A5F',
  'Q Agency': '#7C6FB0',
  'Google': '#4A9B8E',
  'Gap Year': '#E07A5F',
}

const eras = [
  { label: '2014–15', sublabel: 'Early Career', year: 2014 },
  { label: '2016–17', sublabel: 'Growth', year: 2016 },
  { label: '2017–18', sublabel: 'Google Start', year: 2017 },
  { label: '2018–21', sublabel: 'Technical Lead', year: 2018 },
  { label: '2021–25', sublabel: 'Senior Leadership', year: 2021 },
  { label: '2025+', sublabel: 'AI Era', year: 2025 },
]

export function RoleEvolution() {
  const width = 900
  const height = 440
  const padding = { top: 70, right: 20, bottom: 70, left: 20 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  // Year-based X positioning
  const minYear = 2014
  const maxYear = 2025
  const yearRange = maxYear - minYear

  const yearToX = (year: number) => padding.left + ((year - minYear) / yearRange) * chartW

  const nodes = roleNodes.map((node) => ({
    ...node,
    x: yearToX(parseInt(node.year)),
    y: padding.top + chartH - (node.level / 6) * chartH,
  }))

  // Per-node label placement: diagonal offsets keep labels away from circles and the rising curve
  // Bunched nodes (1-4): odd → above-left, even → below-right
  // Spacious nodes (0, 5, 6): standard above/below
  type Anchor = 'start' | 'middle' | 'end'
  const labelPlacements: { dx: number; titleDy: number; subtitleDy: number; anchor: Anchor }[] = [
    // Node 0: Marketing & BI Intern — below, text starts at node (ample space)
    { dx: 0, titleDy: 38, subtitleDy: 54, anchor: 'start' },
    // Node 1: Marketing Analyst — below-right (too close to left edge for end anchor)
    { dx: 24, titleDy: 30, subtitleDy: 46, anchor: 'start' },
    // Node 2: Business Dev Manager — below-right (text extends right, away from curve)
    { dx: 24, titleDy: 30, subtitleDy: 46, anchor: 'start' },
    // Node 3: Account Manager — above-left
    { dx: -24, titleDy: -44, subtitleDy: -28, anchor: 'end' },
    // Node 4: Technical Apps Lead — below-right
    { dx: 24, titleDy: 30, subtitleDy: 46, anchor: 'start' },
    // Node 5: Senior Analytical Lead — above, centered (lots of space)
    { dx: 0, titleDy: -50, subtitleDy: -34, anchor: 'middle' },
    // Node 6: AI & Technology Focus — above, right-aligned (edge)
    { dx: 0, titleDy: -50, subtitleDy: -34, anchor: 'end' },
  ]

  // Create smooth path through nodes
  const pathData = nodes.reduce((acc, node, i) => {
    if (i === 0) return `M ${node.x} ${node.y}`
    const prev = nodes[i - 1]
    const cpx = (prev.x + node.x) / 2
    return `${acc} C ${cpx} ${prev.y} ${cpx} ${node.y} ${node.x} ${node.y}`
  }, '')

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Career progression chart showing role evolution from Marketing and BI Intern at Henkel in 2014 to AI and Technology Focus in 2025">
        <title>Career role evolution from 2014 to 2025</title>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5, 6].map((level) => {
          const y = padding.top + chartH - (level / 6) * chartH
          return (
            <line
              key={level}
              x1={padding.left - 10}
              y1={y}
              x2={width - padding.right + 10}
              y2={y}
              stroke="#EDE6DE"
              strokeWidth="1"
              strokeDasharray="4 4"
              aria-hidden="true"
            />
          )
        })}

        {/* Animated path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: [0.37, 0, 0.63, 1] }}
          aria-hidden="true"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6B35A" />
            <stop offset="30%" stopColor="#7C6FB0" />
            <stop offset="50%" stopColor="#4A9B8E" />
            <stop offset="100%" stopColor="#E07A5F" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const color = colorMap[node.company] || '#4A9B8E'
          const lp = labelPlacements[i]
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + i * 0.18,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Outer ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r="16"
                fill={`${color}15`}
                stroke={color}
                strokeWidth="2"
              />
              {/* Inner dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={color}
              />

              {/* Label */}
              <text
                x={node.x + lp.dx}
                y={node.y + lp.titleDy}
                textAnchor={lp.anchor}
                className="text-[13px] font-semibold fill-warm-800"
              >
                {node.title}
              </text>
              <text
                x={node.x + lp.dx}
                y={node.y + lp.subtitleDy}
                textAnchor={lp.anchor}
                className="text-[11px] fill-warm-500"
              >
                {node.company} · {node.year}
              </text>
            </motion.g>
          )
        })}

      </svg>

      {/* Timeline aligned with chart year positions */}
      <div className="relative mt-3" role="img" aria-label="Career timeline from 2014 to 2025+">
        {/* Timeline line */}
        <div
          className="absolute top-[5px] sm:top-[6px] h-px bg-warm-200"
          style={{
            left: `${(padding.left / width) * 100}%`,
            right: `${(padding.right / width) * 100}%`,
          }}
          aria-hidden="true"
        />
        {eras.map((era, i) => {
          const pct = (yearToX(era.year) / width) * 100
          const isLast = i === eras.length - 1
          const isFirst = i === 0
          return (
            <div
              key={era.label}
              className="absolute flex flex-col items-center"
              style={{
                left: `${pct}%`,
                transform: isFirst ? 'none' : isLast ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
              aria-hidden="true"
            >
              <div
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 bg-warm-50 ${
                  isLast ? 'border-coral' : 'border-warm-300'
                }`}
                style={isFirst ? undefined : isLast ? { marginLeft: 'auto' } : { margin: '0 auto' }}
              />
              <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs font-semibold text-warm-700 whitespace-nowrap">
                {era.label}
              </span>
              <span className="text-[10px] text-warm-400 whitespace-nowrap hidden sm:block">
                {era.sublabel}
              </span>
            </div>
          )
        })}
        {/* Spacer for absolute children */}
        <div className="invisible">
          <div className="w-3 h-3" />
          <span className="mt-2 text-xs">&nbsp;</span>
          <span className="text-[10px]">&nbsp;</span>
        </div>
      </div>
    </div>
  )
}
