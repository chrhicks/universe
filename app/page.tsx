import DarkEnergy from "@/components/DarkEnergy";
import Experience from "@/components/Experience";
import ThingsProgress from "@/components/ThingsProgress";
import UniverseThings from "@/components/UniverseThings";
import Incremental from "@/components/incremental";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-4xl w-full py-3 items-center justify-between text-base bg-gray-900 rounded-md">
        <p className="text-white px-3 py-2 text-2xl font-medium">Universe</p>
        <div className="px-3 py-4">
          <DarkEnergy />
          <div className="w-1/4">
            <Experience />
          </div>
        </div>
        <div className="flex px-3 justify-between">
          <div className="space-y-5 w-1/3">
            <ThingsProgress />
          </div>
        </div>
      </div>
    </main>
  );
}
