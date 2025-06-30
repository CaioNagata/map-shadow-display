
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
    <div className="w-96 bg-black text-white h-screen flex flex-col border-r border-gray-700 overflow-y-auto">
      {/* Violation Header */}
      {selectedVehicleData && (
        <div className="bg-gray-600 p-2 text-center flex justify-between items-center">
          <div className="flex-1">
            <div className="text-xs font-semibold text-white">
              Violação
            </div>
            <div className="text-xs font-medium text-white mt-1">
              {selectedVehicleData.violation}
            </div>
          </div>
          <Badge className="bg-green-500 text-white text-xs ml-4">Pgto em dia</Badge>
        </div>
      )}

      {/* Vehicle Header */}
      {selectedVehicleData && (
        <div className="bg-gray-600 p-2 text-center border-b border-gray-700">
          <div className="text-xs font-semibold text-white">
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
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-6 w-6 p-0">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            {selectedVehicleData.imei}
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            {selectedVehicleData.address}
          </div>

          {/* Information List - Single Column */}
          <div className="text-xs space-y-2">
            <div>
              <span className="font-semibold text-red-400">Alerta:</span> {selectedVehicleData.lastAlert}
            </div>
            
            <div>
              <span className="font-semibold">Contrato:</span> <span className="text-red-400">{selectedVehicleData.contract}</span>
            </div>
            
            <div>
              <span className="font-semibold">Velocidade:</span> {selectedVehicleData.speed}
            </div>
            
            <div>
              <span className="font-semibold">Bat. Principal:</span> {selectedVehicleData.mainBattery}
            </div>
            
            <div>
              <span className="font-semibold">Bat. Secundária:</span> {selectedVehicleData.secondaryBattery}
            </div>
            
            <div>
              <span className="font-semibold">Último ping:</span> {selectedVehicleData.lastPing}
            </div>
            
            <div>
              <span className="font-semibold">Violação carenagem:</span> -
            </div>
            
            <div>
              <span className="font-semibold">Violação Blindagem:</span> -
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
