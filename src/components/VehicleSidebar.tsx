
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
    id: "1",
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
    <div className="w-96 bg-white text-black h-screen flex flex-col border-r">
      {/* Header with vehicle info */}
      {selectedVehicleData && (
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold">{selectedVehicleData.id}169933 - {selectedVehicleData.name}</span>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-green-600" />
              <span className="text-sm">{selectedVehicleData.phone}</span>
              <Badge className="bg-green-500 text-white text-xs">Pgto em dia</Badge>
            </div>
          </div>
          
          <div className="text-xs text-gray-600 mb-4">
            {selectedVehicleData.imei}
          </div>
          
          <div className="text-xs text-gray-600 mb-4">
            {selectedVehicleData.address}
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="font-semibold text-red-600 mb-1">Alerta</div>
              <div className="mb-2">{selectedVehicleData.lastAlert}</div>
              <div className="font-semibold mb-1">Último ping</div>
              <div>{selectedVehicleData.lastPing}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Violação</div>
              <div className="mb-2">{selectedVehicleData.violation}</div>
              <div className="font-semibold mb-1">Quilometragem</div>
              <div className="mb-2">Contrato</div>
              <div className="text-red-600">{selectedVehicleData.contract}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Velocidade</div>
              <div className="mb-2">{selectedVehicleData.speed}</div>
              <div className="font-semibold mb-1">Bat. Principal</div>
              <div className="mb-1">{selectedVehicleData.mainBattery}</div>
              <div className="font-semibold mb-1">Bat. Secundária</div>
              <div>{selectedVehicleData.secondaryBattery}</div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-3">Atividades</h3>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-2">
          CARREGAR ATIVIDADES
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-2">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          LOCALIZAÇÃO ALERTA
        </Button>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          TELEMETRIA RÁPIDA
        </Button>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          CHAMAR WHATSAPP
        </Button>
      </div>

      {/* History Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-gray-50 p-3 rounded mb-2">
          <div className="font-semibold text-sm mb-1">Histórico</div>
          <div className="text-xs text-gray-600 mb-1">
            Deiverson soares de andrade - 25/06/2025 22:29
          </div>
          <div className="text-xs">
            <span className="font-semibold">Evento:</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold">Descrição:</span> SEGUE COMUNICANDO SEM ALTERAÇÃO OU EVOLUÇÃO NO ALERTA
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs text-gray-600 mb-1">
            MATHEUS HENRIQUE DA SILVA PEREIRA - 24/06/2025 20:46
          </div>
          <div className="text-xs">
            <span className="font-semibold">Evento:</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold">Descrição:</span> SEGUE COMUNICANDO SEM ALTERAÇÃO OU EVOLUÇÃO NO ALERTA
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSidebar;
