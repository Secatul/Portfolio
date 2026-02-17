"use client"

import type { MDXRemoteProps } from "next-mdx-remote"

export const mdxComponents: MDXRemoteProps["components"] = {
  // Headings
  h1: ({ children }) => (
    <h1 style={{
      fontSize: "1.5rem",
      fontWeight: 400,
      margin: "30px 0 15px",
      color: "#fff",
      letterSpacing: "0.02em"
    }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{
      fontSize: "1.2rem",
      fontWeight: 400,
      margin: "25px 0 12px",
      color: "#e0e0e0",
      letterSpacing: "0.02em"
    }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{
      fontSize: "1rem",
      fontWeight: 400,
      margin: "20px 0 10px",
      color: "#ccc"
    }}>
      {children}
    </h3>
  ),

  // Paragraph
  p: ({ children }) => (
    <p style={{
      margin: "15px 0",
      lineHeight: 1.8,
      color: "#bbb"
    }}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        color: "#6ee7b7",
        textDecoration: "none",
        borderBottom: "1px solid #3a6a5a"
      }}
    >
      {children}
    </a>
  ),

  // Code blocks
  pre: ({ children }) => (
    <pre style={{
      background: "rgba(0, 0, 0, 0.5)",
      border: "1px solid #333",
      padding: "15px",
      overflow: "auto",
      margin: "20px 0",
      fontSize: "0.85rem",
      lineHeight: 1.6
    }}>
      {children}
    </pre>
  ),

  // Inline code
  code: ({ children }) => {
    // Se está dentro de um pre, não adiciona estilo extra
    const isInline = typeof children === "string" && !children.includes("\n")
    if (!isInline) return <code>{children}</code>
    
    return (
      <code style={{
        background: "rgba(255, 255, 255, 0.05)",
        padding: "2px 6px",
        fontSize: "0.85em",
        color: "#f0a0a0"
      }}>
        {children}
      </code>
    )
  },

  // Lists
  ul: ({ children }) => (
    <ul style={{
      margin: "15px 0",
      paddingLeft: "25px",
      color: "#bbb"
    }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{
      margin: "15px 0",
      paddingLeft: "25px",
      color: "#bbb"
    }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{
      margin: "8px 0",
      lineHeight: 1.6
    }}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: "3px solid #444",
      margin: "20px 0",
      paddingLeft: "20px",
      color: "#888",
      fontStyle: "italic"
    }}>
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <hr style={{
      border: "none",
      borderTop: "1px solid #333",
      margin: "30px 0"
    }} />
  ),

  // Images
  img: ({ src, alt }) => (
    <img
      src={src || "/placeholder.svg"}
      alt={alt || ""}
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "20px 0",
        border: "1px solid #333"
      }}
    />
  ),

  // Tables
  table: ({ children }) => (
    <div style={{ overflowX: "auto", margin: "20px 0" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "0.85rem"
      }}>
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th style={{
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid #333",
      padding: "10px",
      textAlign: "left",
      color: "#ccc"
    }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{
      border: "1px solid #333",
      padding: "10px",
      color: "#aaa"
    }}>
      {children}
    </td>
  ),

}
