
const PageLoader = () => {
  return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-(--color-text-muted) border-t-(--color-text) rounded-full animate-spin" />
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Loading...
          </p>
        </div>
      </div>
  )
}

export default PageLoader