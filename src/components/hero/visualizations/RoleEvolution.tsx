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

export function RoleEvolution() {
  const width = 900
  const height = 380
  const padding = { top: 30, right: 140, bottom: 40, left: 140 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const nodes = roleNodes.map((node, i) => ({
    ...node,
    x: padding.left + (i / (roleNodes.length - 1)) * chartW,
    y: padding.top + chartH - (node.level / 6) * chartH,
  }))

  // Create smooth path through nodes
  const pathData = nodes.reduce((acc, node, i) => {
    if (i === 0) return `M ${node.x} ${node.y}`
    const prev = nodes[i - 1]
    const cpx = (prev.x + node.x) / 2
    return `${acc} C ${cpx} ${prev.y} ${cpx} ${node.y} ${node.x} ${node.y}`
  }, '')

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
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
          const isLeft = i % 2 === 0
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
                x={node.x}
                y={isLeft ? node.y - 26 : node.y + 34}
                textAnchor="middle"
                className="text-[11px] font-semibold fill-warm-800"
              >
                {node.title}
              </text>
              <text
                x={node.x}
                y={isLeft ? node.y - 13 : node.y + 47}
                textAnchor="middle"
                className="text-[10px] fill-warm-500"
              >
                {node.company} · {node.year}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
