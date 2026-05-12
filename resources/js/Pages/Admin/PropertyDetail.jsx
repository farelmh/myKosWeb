import AdminLayout from "@/Layouts/AdminLayout";
import { MapContainer, Marker, Popup } from "react-leaflet";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";
import { ArrowLeft } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Show({ property }) {
    return (
        <AdminLayout>
            <div className="p-6 space-y-6 min-h-screen bg-background dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 rounded-2xl">
            <button
                                onClick={() => router.visit('/admin/properties')}
                                className="
                                    flex items-center gap-2 text-sm text-kost-muted hover:text-kost-dark dark:hover:text-mint-50 transition
                                "
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali
                            </button>

                {/* HEADER */}
                <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between">

                        {/* LEFT */}
                        <div className="flex items-center gap-4">

                            

                            <div>
                                <h1 className="text-2xl font-bold text-kost-dark dark:text-mint-50">
                                    {property.name}
                                </h1>
                                <p className="text-sm text-kost-muted dark:text-mint-100/60 mt-1">
                                    {property.address}, {property.city}
                                </p>
                            </div>
                        </div>

                        {/* STATUS */}
                        <span className="px-4 py-2 rounded-xl bg-mint-200/60 dark:bg-mint-200/20 text-kost-dark dark:text-mint-50 text-sm font-medium">
                            Active
                        </span>
                    </div>
                </div>

                {/* IMAGES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.images?.map((image) => (
                        <img
                            key={image.id}
                            src={`/storage/${image.image_path}`}
                            className="w-full h-64 object-cover rounded-xl border border-mint-200 dark:border-dark-border/20"
                        />
                    ))}
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* DESCRIPTION */}
                        <Card title="Description">
                            {property.description || "No description available"}
                        </Card>

                        {/* RULES */}
                        <Card title="Rules">
                            {property.rules || "No rules available"}
                        </Card>

                        {/* FACILITIES */}
                        <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-kost-dark dark:text-mint-50 mb-4">
                                Facilities
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {property.facilities?.map((f) => (
                                    <span
                                        key={f.id}
                                        className="px-3 py-1 text-xs rounded-full bg-mint-100 dark:bg-mint-200/20 text-kost-dark dark:text-mint-50"
                                    >
                                        {f.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* ROOM TYPES */}
                        <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-kost-dark dark:text-mint-50 mb-5">
                                Room Types
                            </h2>

                            <div className="space-y-4">
                                {property.room_types?.map((room) => (
                                    <div
                                        key={room.id}
                                        className="border border-mint-200 dark:border-dark-border/20 rounded-xl p-4 flex justify-between"
                                    >
                                        <div>
                                            <h3 className="text-sm font-semibold text-kost-dark dark:text-mint-50">
                                                {room.name}
                                            </h3>

                                            <div className="mt-2 text-xs text-kost-muted dark:text-mint-100/60 space-y-1">
                                                <p>Rp {room.price?.toLocaleString("id-ID")}</p>
                                                <p>Size: {room.size}</p>
                                                <p>Capacity: {room.capacity}</p>
                                            </div>
                                        </div>

                                        <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                                            Available
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {/* OWNER */}
                        <Card title="Owner">
                            <p><b>Name:</b> {property.owner?.name}</p>
                            <p><b>Email:</b> {property.owner?.email}</p>
                            <p><b>Phone:</b> {property.owner?.phone}</p>
                        </Card>

                        {/* MAP */}
                        <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-kost-dark dark:text-mint-50 mb-4">
                                Location
                            </h2>

                            <div className="text-xs text-kost-muted dark:text-mint-100/60">
                                {property.latitude}, {property.longitude}
                            </div>

                            <div className="mt-4 rounded-xl overflow-hidden border border-mint-200 dark:border-dark-border/20">
                                <MapContainer
                                    center={[property.latitude, property.longitude]}
                                    zoom={16}
                                    style={{ height: "250px" }}
                                >
                                    <GoogleTileLayer />
                                    <Marker position={[property.latitude, property.longitude]}>
                                        <Popup>{property.name}</Popup>
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

/* REUSABLE CARD */
function Card({ title, children }) {
    return (
        <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-kost-dark dark:text-mint-50 mb-3">
                {title}
            </h2>

            <div className="text-sm text-kost-muted dark:text-mint-100/60 whitespace-pre-line">
                {children}
            </div>
        </div>
    );
}