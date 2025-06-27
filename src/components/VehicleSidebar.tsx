
import { useState } from "react";
import { Search, MapPin, Clock, Battery, Signal, Menu, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  id: string;
  name: string;
  phone: string;
  imei: string;
  address: string;
  lastAlert: string;
  lastPing: string;
  violation: string;
  speed: string;
  odometer: string;
  contract: string;
  mainBattery: string;
  secondaryBattery: string;
  status: "online" | "offline" | "alert";
}

interface VehicleSidebarProps {
  selectedVehicle: string | null;
  onVehicleSelect: (vehicleId: string) => void;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1169933",
    name: "ANDERSON ANDRADE DOS SANTOS",
    phone: "5573 998701636",
    imei: "Mottu Sport ESD - Imei: 218013266 | TBI-IF96",
    address: "rua floresta azul , 113 - Jorge Amado, Ilhéus - CEP: 45611532",
    lastAlert: "26/06/2025 20:28 (33 min)",
    lastPing: "26/06/2025 20:54 (7 min)",
    violation: "Entrada Zona De Risco",
    speed: "0 km/h",
    odometer: "1 sem.",
    contract: "1 sem.",
    mainBattery: "13,48",
    secondaryBattery: "4,2",
    status: "alert"
  }
];

const VehicleSidebar = ({ selectedVehicle, onVehicleSelect }: VehicleSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedVehicleData = mockVehicles.find(v => v.id === selectedVehicle);

  return (
    <div className="w-96 bg-black text-white h-screen flex flex-col border-r border-gray-700">
      {/* Violation Alert Container */}
      {selectedVehicleData && (
        <div className="p-4 bg-red-900 border-b border-red-700">
          <div className="text-sm font-semibold text-red-100 mb-1">Violação</div>
          <div className="text-lg font-bold text-white">{selectedVehicleData.violation}</div>
        </div>
      )}

      {/* Vehicle Info Container */}
      {selectedVehicleData && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-white">
              {selectedVehicleData.id} - {selectedVehicleData.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <Phone className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">{selectedVehicleData.phone}</span>
            <Badge className="bg-green-600 text-white text-xs">Pgto em dia</Badge>
          </div>
          
          <div className="text-xs text-gray-400 mb-3">
            {selectedVehicleData.imei}
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            {selectedVehicleData.address}
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="font-semibold text-red-400 mb-1">Alerta</div>
              <div className="mb-2 text-gray-300">{selectedVehicleData.lastAlert}</div>
              <div className="font-semibold mb-1 text-gray-200">Último ping</div>
              <div className="text-gray-300">{selectedVehicleData.lastPing}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1 text-gray-200">Velocidade</div>
              <div className="mb-2 text-gray-300">{selectedVehicleData.speed}</div>
              <div className="font-semibold mb-1 text-gray-200">Quilometragem</div>
              <div className="mb-2 text-gray-300">Contrato</div>
              <div className="text-red-400">{selectedVehicleData.contract}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1 text-gray-200">Bat. Principal</div>
              <div className="mb-1 text-gray-300">{selectedVehicleData.mainBattery}</div>
              <div className="font-semibold mb-1 text-gray-200">Bat. Secundária</div>
              <div className="text-gray-300">{selectedVehicleData.secondaryBattery}</div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-semibold mb-3 text-white">Atividades</h3>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          CARREGAR ATIVIDADES
        </Button>
      </div>

      {/* Action Buttons - Smaller */}
      <div className="p-4 space-y-2">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2">
          LOCALIZAÇÃO ALERTA
        </Button>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2">
          TELEMETRIA RÁPIDA
        </Button>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2">
          CHAMAR WHATSAPP
        </Button>
      </div>

      {/* History Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-gray-800 p-3 rounded mb-2">
          <div className="font-semibold text-sm mb-1 text-white">Histórico</div>
          <div className="text-xs text-gray-400 mb-1">
            Deiverson soares de andrade - 25/06/2025 22:29
          </div>
          <div className="text-xs text-gray-300">
            <span className="font-semibold">Evento:</span>
          </div>
          <div className="text-xs text-gray-300">
            <span className="font-semibold">Descrição:</span> SEGUE COMUNICANDO SEM ALTERAÇÃO OU EVOLUÇÃO NO ALERTA
          </div>
        </div>

        <div className="bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-400 mb-1">
            MATHEUS HENRIQUE DA SILVA PEREIRA - 24/06/2025 20:46
          </div>
          <div className="text-xs text-gray-300">
            <span className="font-semibold">Evento:</span>
          </div>
          <div className="text-xs text-gray-300">
            <span className="font-semibold">Descrição:</span> SEGUE COMUNICANDO SEM ALTERAÇÃO OU EVOLUÇÃO NO ALERTA
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSidebar;
