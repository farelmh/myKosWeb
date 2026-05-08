import AdminLayout from "@/Layouts/AdminLayout"
import { MapContainer, Marker, Popup } from "react-leaflet";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";

export default function Show({ property }) {
    return (
        <AdminLayout>
        <div className="p-6 space-y-6 bg-[#0b0b1a] min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {property.name}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {property.address}, {property.city}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-semibold">
                            Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.images?.map((image) => (
                    <img
                        key={image.id}
                        src={`/storage/${image.image_path}`}
                        alt="Property"
                        className="w-full h-64 object-cover rounded-2xl shadow"
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Description
                        </h2>

                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {property.description || 'No description available'}
                        </p>
                    </div>

                    {/* Rules */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Rules
                        </h2>

                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {property.rules || 'No rules available'}
                        </p>
                    </div>

                    {/* Facilities */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Facilities
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {property.facilities?.map((facility) => (
                                <div
                                    key={facility.id}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium"
                                >
                                    {facility.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Room Types */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Room Types
                        </h2>

                        <div className="space-y-4">
                            {property.room_types?.map((room) => (
                                <div
                                    key={room.id}
                                    className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {room.name}
                                        </h3>

                                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                                            <p>Price: Rp {room.price?.toLocaleString('id-ID')}</p>
                                            <p>Size: {room.size}</p>
                                            <p>Capacity: {room.capacity} person</p>
                                            <p>Total Rooms: {room.total_rooms}</p>
                                            <p>Rental Type: {room.rental_type}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="px-4 py-2 rounded-xl bg-yellow-100 text-yellow-700 text-sm font-semibold">
                                            Available
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="space-y-6">
                    {/* Owner */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Owner Information
                        </h2>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-semibold text-gray-800">Name:</span>{' '}
                                {property.owner?.name}
                            </p>

                            <p>
                                <span className="font-semibold text-gray-800">Email:</span>{' '}
                                {property.owner?.email}
                            </p>

                            <p>
                                <span className="font-semibold text-gray-800">Phone:</span>{' '}
                                {property.owner?.phone}
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Location
                        </h2>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-semibold text-gray-800">Latitude:</span>{' '}
                                {property.latitude}
                            </p>

                            <p>
                                <span className="font-semibold text-gray-800">Longitude:</span>{' '}
                                {property.longitude}
                            </p>
                        </div>

                        <div className="mt-4 rounded-2xl overflow-hidden border">
                            <MapContainer
                                center={property.latitude && property.longitude ? [property.latitude, property.longitude] : [0, 0]}
                                zoom={16} style={{height: "250px", width: "100%"}}
                            >

                                <GoogleTileLayer />
                                <Marker position={[property.latitude, property.longitude]}>
                                    <Popup>
                                        {property.name} <br /> {property.address}
                                    </Popup>
                                </Marker>

                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AdminLayout>
    );
}
