import UniverseThings from "@/components/UniverseThings";
import Incremental from "@/lib/incremental";
import { Progress } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-4xl w-full py-3 items-center justify-between text-base bg-gray-900 rounded-md">
        <p className="text-white px-3 py-2 text-2xl font-medium">Universe</p>
        <div className="px-3 py-4">
          <Progress
            size="lg"
            classNames={{
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-gray-700 to-purple-800",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            label="Dark Energy"
            value={95}
            showValueLabel={true}
          />
        </div>
        <div className="flex px-3 justify-between">
          <div className="space-y-3">
            <div className="flex space-x-2 justify-center items-center">
              <p className="w-full">Quarks</p>
              <Incremental type="quarks" />
            </div>
            <div className="flex space-x-2 justify-center items-center">
              <p className="w-full">Protons</p>
              <Incremental type="quarks" />
            </div>
            <div className="flex space-x-2 justify-center items-center">
              <p className="w-full">Neutrons</p>
              <Incremental type="quarks" />
            </div>
          </div>
          <UniverseThings />
        </div>
      </div>
    </main>
  );
}
