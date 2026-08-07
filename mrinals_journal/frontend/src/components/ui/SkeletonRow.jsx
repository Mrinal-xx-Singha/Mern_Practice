// Skeleton Row
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-2.5 w-32 bg-gray-100 rounded" />
        </div>
      </div>
    </td>
    <td className="px-4 py-3">
      <div className="h-3 w-16 bg-gray-100 rounded" />
    </td>
    <td className="px-4 py-3">
      <div className="h-3 w-20 bg-gray-100 rounded" />
    </td>
    <td className="px-4 py-3">
      <div className="h-3 w-8 bg-gray-100 rounded" />
    </td>
  </tr>
);

export default SkeletonRow