import { Card, CardContent } from "../components/ui/Card.jsx";
import { Link } from "react-router-dom";

export default function HomeDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Welcome to Deokuli Dham</h1>

      <p className="text-center text-lg max-w-2xl mx-auto">
        This platform showcases the community of Deokuli Dham, highlighting the hierarchy and detailed family tree structures of individuals.
      </p>

      {/* Community Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Total Brahmans</h2>
            <p className="text-2xl">~2000</p>
          </CardContent>
        </Card>
        <Card className="bg-green-100">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Aneriye</h2>
            <p className="text-2xl">~1300</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Babhnaieye</h2>
            <p className="text-2xl">~700</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link to="/summary">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-medium">📊 Community Summary</h3>
              <p>Visual stats and breakdowns</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/tree">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-medium">🌳 Family Tree View</h3>
              <p>Explore male hierarchy</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/list">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-medium">📋 People List</h3>
              <p>Search and filter all people</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/group-people" className="text-blue-500 hover:underline">
          <p>Group People View </p>
        </Link>

        <Link to="/group-summary-table" className="text-blue-500 hover:underline">
         <p>Group Summary Table View </p> 
        </Link>

      </div>

      {/* News / Announcements */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">📢 Announcements</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Website launched! Explore the family tree and summaries.</li>
          <li>Coming soon: Group-wise statistics and individual highlights.</li>
          <li>Submit corrections or new entries via the contact page.</li>
        </ul>
      </div>

      {/* Carousel of Featured People (static for now) */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">🌟 Featured Families</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="min-w-[250px] flex-shrink-0">
              <CardContent className="p-4 text-center">
                <img
                  src={`https://via.placeholder.com/200x120?text=Family+${n}`}
                  alt={`Family ${n}`}
                  className="mb-2 mx-auto rounded"
                />
                <h4 className="font-semibold">Family Name {n}</h4>
                <p className="text-sm">Brief description or head of family</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Placeholder Image Gallery */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">🏞️ Glimpses of Deokuli Dham</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <img
              key={n}
              src={`https://via.placeholder.com/400x250?text=Deokuli+View+${n}`}
              alt={`Deokuli View ${n}`}
              className="w-full h-auto rounded shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
