import { Card, CardContent } from "../components/ui/Card.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomeDashboard() {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">{t("welcome")}</h1>

      <p className="text-center text-lg max-w-2xl mx-auto">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">{t("totalBrahmans")}</h2>
            <p className="text-2xl">~2000</p>
          </CardContent>
        </Card>
        <Card className="bg-green-100">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">{t("aneriye")}</h2>
            <p className="text-2xl">~1300</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">{t("babhnaieye")}</h2>
            <p className="text-2xl">~700</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link to="/summary">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-medium">{t("communitySummary")}</h3>
              <p>{t("summaryDesc")}</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/tree">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-medium">{t("treeView")}</h3>
              <p>{t("treeDesc")}</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/list">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-medium">{t("peopleList")}</h3>
              <p>{t("peopleDesc")}</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/group-people" className="text-blue-500 hover:underline">
          <p>{t("groupPeopleView")}</p>
        </Link>

        <Link to="/group-summary-table" className="text-blue-500 hover:underline">
          <p>{t("groupSummaryTable")}</p>
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">{t("announcements")}</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>{t("announcement1")}</li>
          <li>{t("announcement2")}</li>
          <li>{t("announcement3")}</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{t("featured")}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="min-w-[250px] flex-shrink-0">
              <CardContent className="p-4 text-center">
                <img
                  src={`https://via.placeholder.com/200x120?text=Family+${n}`}
                  alt={`Family ${n}`}
                  className="mb-2 mx-auto rounded"
                />
                <h4 className="font-semibold">{t("familyName")} {n}</h4>
                <p className="text-sm">{t("descriptionHead")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">{t("glimpses")}</h2>
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
