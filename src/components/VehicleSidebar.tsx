
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
    <div className="w-96 bg-black text-white h-screen flex flex-col border-r border-gray-700">
      {/* Violation Header */}
      {selectedVehicleData && (
        <div className="bg-red-600 p-4 text-center flex justify-between items-center">
          <div className="flex-1">
            <div className="text-xl font-bold text-white">
              Violação
            </div>
            <div className="text-lg font-semibold text-white mt-1">
              {selectedVehicleData.violation}
            </div>
          </div>
          <Badge className="bg-green-500 text-white text-xs ml-4">Pgto em dia</Badge>
        </div>
      )}

      {/* Vehicle Header */}
      {selectedVehicleData && (
        <div className="bg-gray-800 p-4 text-center border-b border-gray-700">
          <div className="text-lg font-bold text-white">
            {selectedVehicleData.id}169933 - {selectedVehicleData.name}
          </div>
        </div>
      )}

      {/* Vehicle info */}
      {selectedVehicleData && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-green-600" />
              <span className="text-sm">{selectedVehicleData.phone}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            {selectedVehicleData.imei}
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            {selectedVehicleData.address}
          </div>

          {/* Information List - Single Column */}
          <div className="text-xs space-y-3">
            <div>
              <div className="font-semibold text-red-400 mb-1">Alerta</div>
              <div>{selectedVehicleData.lastAlert}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Contrato</div>
              <div className="text-red-400">{selectedVehicleData.contract}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Velocidade</div>
              <div>{selectedVehicleData.speed}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Bat. Principal</div>
              <div>{selectedVehicleData.mainBattery}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Bat. Secundária</div>
              <div>{selectedVehicleData.secondaryBattery}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Último ping</div>
              <div>{selectedVehicleData.lastPing}</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Violação carenagem</div>
              <div>-</div>
            </div>
            
            <div>
              <div className="font-semibold mb-1">Violação Blindagem</div>
              <div>-</div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-semibold mb-3">Atividades</h3>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-2">
          CARREGAR ATIVIDADES
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-2">
        <div className="flex space-x-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2">
            LOCALIZAÇÃO ALERTA
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2">
            TELEMETRIA RÁPIDA
          </Button>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2">
          CHAMAR WHATSAPP
        </Button>
      </div>

      {/* History Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-gray-800 p-3 rounded mb-2">
          <div className="font-semibold text-sm mb-1">Histórico</div>
          <div className="text-xs text-gray-400 mb-1">
            Deiverson soares de andrade - 25/06/2025 22:29
          </div>
          <div className="text-xs">
            <span className="font-semibold">Evento:</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold">Descrição:</span> SEGUE COMUNICANDO SEM ALTERAÇÃO OU EVOLUÇÃO NO ALERTA
          </div>
        </div>

        <div className="bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-400 mb-1">
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
