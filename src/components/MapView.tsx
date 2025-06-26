
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, Navigation, ZoomIn, ZoomOut } from "lucide-react";

interface MapViewProps {
  selectedVehicle: string | null;
}

const MapView = ({ selectedVehicle }: MapViewProps) => {
  const [mapToken, setMapToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Mock vehicle locations for demonstration
  const vehicleLocations = [
    { id: "1", lat: -25.4284, lng: -49.2733, name: "Curitiba", status: "online" },
    { id: "2", lat: -25.4372, lng: -49.2697, name: "Curitiba Centro", status: "online" },
    { id: "3", lat: -8.7619, lng: -63.9039, name: "Porto Velho", status: "alert" },
    { id: "4", lat: -2.5307, lng: -44.3068, name: "São Luís", status: "online" },
    { id: "5", lat: -23.5505, lng: -46.6333, name: "São Paulo", status: "offline" },
  ];

  if (showTokenInput) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Map Configuration</h2>
            <p className="text-gray-600">
              Enter your Mapbox public token to display the interactive map.
              Get your token at{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwia..."
              value={mapToken}
              onChange={(e) => setMapToken(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={() => {
                if (mapToken.trim()) {
                  setShowTokenInput(false);
                }
              }}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!mapToken.trim()}
            >
              Load Map
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Demo Mode</h3>
            <p className="text-sm text-gray-600 mb-3">
              You can also continue without a token to see the layout
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowTokenInput(false)}
              className="w-full"
            >
              Continue Demo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative bg-gray-100">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              CARREGAR ATIVIDADES
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              LOCALIZAÇÃO ALERTA
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              TELEMETRIA RÁPIDA
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              CHAMAR WHATSAPP
            </Button>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-20 right-4 z-10 flex flex-col space-y-2">
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <Layers className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Mock Map Display */}
      <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="relative w-full h-full bg-green-100/30">
          {/* Simulated map markers */}
          {vehicleLocations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                selectedVehicle === location.id ? "scale-125 z-20" : "z-10"
              }`}
              style={{
                top: `${30 + index * 15}%`,
                left: `${25 + index * 20}%`,
              }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                location.status === "online" ? "bg-green-500" :
                location.status === "alert" ? "bg-red-500" : "bg-gray-500"
              }`}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                {location.name}
              </div>
            </div>
          ))}

          {/* Map attribution */}
          <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
            Map demo - Connect Mapbox for full functionality
          </div>
        </div>
      </div>

      {/* Selected Vehicle Info Panel */}
      {selectedVehicle && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-lg mb-2">Vehicle Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Speed:</span>
              <span className="font-medium">15 km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Update:</span>
              <span className="font-medium">2 min ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
