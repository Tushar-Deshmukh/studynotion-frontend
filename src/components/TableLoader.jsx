export default function TableLoader() {
  return (
    <tr>
      <td colSpan="100%" className="text-center py-6">
        <div className="flex justify-center items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-gray-500 text-sm">Loading data...</span>
        </div>
      </td>
    </tr>
  );
}
