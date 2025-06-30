
import { useState, useEffect } from "react";
import VehicleSidebar from "../components/VehicleSidebar";
import MapView from "../components/MapView";

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Auto-select first vehicle on load
  useEffect(() => {
    setSelectedVehicle("1");
  }, []);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <VehicleSidebar 
        selectedVehicle={selectedVehicle}
        onVehicleSelect={setSelectedVehicle}
      />
      <div className="flex-1">
        <MapView selectedVehicle={selectedVehicle} />
      </div>
    </div>
  );
};

export default Index;
