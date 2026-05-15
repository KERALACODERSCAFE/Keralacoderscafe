"use client"

import { motion } from "framer-motion"
import * as React from "react"

type ColourfulTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string
  interval?: number
  colors?: string[]
  animationDuration?: number
  staggerDelay?: number
}

const defaultColors = [
  "#131414ff", // Kerala green
  "#171817ff", // Deep leaf green
  "#050505ff", // Kathakali red
  "#0f0f0eff", // Temple yellow
  "#151514ff", // Theyyam orange
  "#181919ff", // Backwater blue
  "#101010ff", // Gold
  "#100f0fff", // Mural brown
  "#131414ff", // Soft gray
  "#090909ff"  // Light text
]

export default function ColourfulText({
  text,
  interval = 5000,
  colors = defaultColors,
  animationDuration = 0.5,
  staggerDelay = 0.05,
  ...props
}: ColourfulTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null)

  const [currentColors, setCurrentColors] = React.useState(colors)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5)
      setCurrentColors(shuffled)
      setCount(prev => prev + 1)
    }, interval)

    return () => clearInterval(intervalId)
  }, [colors, interval])

  const characters = React.useMemo(() => {
    if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
      const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })
      return Array.from(segmenter.segment(text), ({ segment }) => segment)
    }

    return Array.from(text)
  }, [text])

  return (
    <span data-slot="colourful-text" ref={localRef} {...props}>
      <motion.span
        animate={{
          y: [0, -4, 0],
          scale: [1, 1.02, 1],
          filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
        }}
        className="inline-block will-change-transform will-change-filter"
        initial={{ y: 0 }}
        transition={{ duration: animationDuration + 0.1 }}
      >
        {characters.map((char, index) => (
          <motion.span
            animate={{
              color: currentColors[index % currentColors.length],
              y: [0, -3, 0],
              scale: [1, 1.01, 1],
              filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
              opacity: [1, 0.8, 1],
            }}
            className="inline-block whitespace-pre will-change-transform will-change-opacity will-change-filter"
            initial={{ y: 0 }}
            key={`${char}-${count}-${index}`}
            transition={{
              duration: animationDuration,
              delay: index * staggerDelay,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}
