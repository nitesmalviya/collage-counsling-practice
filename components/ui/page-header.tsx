"use client"

interface PageHeaderProps {
  title: string
  description?: string
  rightSlot?: React.ReactNode
  className?: string
}

export default function PageHeader({
  title,
  description,
  rightSlot,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description ? (
          <p className="text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {rightSlot}
    </div>
  )
}


