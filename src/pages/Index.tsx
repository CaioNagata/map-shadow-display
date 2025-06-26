
import { useState } from "react";
import VehicleSidebar from "../components/VehicleSidebar";
import MapView from "../components/MapView";

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex bg-background">
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
