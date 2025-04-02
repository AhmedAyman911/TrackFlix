export default function Background() {
    return (
      <div className="fixed inset-0 -z-10 bg-white dark:bg-black">
        <div className="absolute w-[600px] h-[600px] bg-red-900 opacity-10 rounded-full blur-[180px] top-[-150px] left-[-150px] animate-pulse pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] bg-blue-900 opacity-10 rounded-full blur-[180px] bottom-[-200px] right-[-180px] animate-pulse pointer-events-none" />
      </div>
    );
  }
  