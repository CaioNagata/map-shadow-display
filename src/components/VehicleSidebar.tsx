
import { useState } from "react";
import { Search, MapPin, Clock, Battery, Signal, Menu, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  location: string;
  lastUpdate: string;
  status: "online" | "offline" | "alert";
  speed: string;
  battery: string;
}

interface VehicleSidebarProps {
  selectedVehicle: string | null;
  onVehicleSelect: (vehicleId: string) => void;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "MATHEUS PHELIPE VELLOZO FERNANDES",
    plate: "BYY-6H46",
    location: "Curitiba - Mottu Curitiba",
    lastUpdate: "1613781",
    status: "online",
    speed: "0 km/h",
    battery: "85%"
  },
  {
    id: "2", 
    name: "MATHEUS MANOEL IGNACIO",
    plate: "TAU-8B38",
    location: "Curitiba - Mottu Curitiba",
    lastUpdate: "402667",
    status: "online",
    speed: "15 km/h",
    battery: "92%"
  },
  {
    id: "3",
    name: "MARCELO LUCIANO DOS SANTOS MOREIRA",
    plate: "TBK-3B80",
    location: "Porto Velho - Mottu Porto Velho",
    lastUpdate: "1912486",
    status: "alert",
    speed: "0 km/h",
    battery: "45%"
  },
  {
    id: "4",
    name: "FRANCIMAEL DE MELO DA SILVA",
    plate: "FPK-6A52",
    location: "São Luís - Mottu São Luís",
    lastUpdate: "1099517",
    status: "online",
    speed: "32 km/h",
    battery: "78%"
  },
  {
    id: "5",
    name: "KAUAN BRITO DOS SANTOS",
    plate: "TAZ-1I40",
    location: "São Paulo - Centro",
    lastUpdate: "3741656",
    status: "offline",
    speed: "0 km/h",
    battery: "12%"
  }
];

const VehicleSidebar = ({ selectedVehicle, onVehicleSelect }: VehicleSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"placa" | "chassi" | "usuario">("placa");

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-gray-500";
      case "alert": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: Vehicle["status"]) => {
    switch (status) {
      case "online": return "Online";
      case "offline": return "Offline";
      case "alert": return "Alerta";
      default: return "Unknown";
    }
  };

  return (
    <div className="w-96 bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Menu className="w-6 h-6" />
            <div className="text-green-400 font-bold text-xl">MONITOR</div>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Placa ou Chassi"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-4">
          <Button
            variant={activeTab === "placa" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("placa")}
            className={`flex-1 ${activeTab === "placa" ? "bg-green-600 hover:bg-green-700" : "text-gray-300 hover:text-white"}`}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Placa
          </Button>
          <Button
            variant={activeTab === "chassi" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("chassi")}
            className={`flex-1 ${activeTab === "chassi" ? "bg-green-600 hover:bg-green-700" : "text-gray-300 hover:text-white"}`}
          >
            Chassi
          </Button>
          <Button
            variant={activeTab === "usuario" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("usuario")}
            className={`flex-1 ${activeTab === "usuario" ? "bg-green-600 hover:bg-green-700" : "text-gray-300 hover:text-white"}`}
          >
            ID usuário
          </Button>
        </div>

        {/* Search by Telemetry Button */}
        <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600">
          Pesquisar por Telemetria
        </Button>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
              selectedVehicle === vehicle.id ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => onVehicleSelect(vehicle.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(vehicle.status)}`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-tight mb-1">
                  {vehicle.name}
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  Placa: <span className="text-white">{vehicle.plate}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  Filial: {vehicle.location}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.lastUpdate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Signal className="w-3 h-3" />
                      <span>{vehicle.speed}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Battery className="w-3 h-3" />
                      <span>{vehicle.battery}</span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getStatusColor(vehicle.status)} text-white border-none`}
                  >
                    {getStatusText(vehicle.status)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSidebar;
