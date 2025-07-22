import { useParams } from "react-router-dom";
import  groupSummaryData  from "../i18n/locales/en/DeokuliGroupSummary_en.json"; // your table data

import deokuliAnerieyePeopleDataEnglish from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleDataHindi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
import slugify from "slugify";

const GroupDetailPage = () => {
  const { groupId } = useParams();

  // Find matching group based on slug
  const group = groupSummaryData.find(
    (g) => slugify(g.gar || g.Ghar || "", { lower: true }) === groupId
  );

  if (!group) {
    return <div className="p-4 text-red-500">Group not found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{group.Ghar}</h1>

      <table className="table-auto border-collapse w-full text-left">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Is Babhnaiye</td>
            <td className="border px-4 py-2">{group["Is Babhnaiye"] || "No"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Waasi</td>
            <td className="border px-4 py-2">{group.Waasi || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Pratham Purush</td>
            <td className="border px-4 py-2">{group["Pratham Purush"] || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Gotra</td>
            <td className="border px-4 py-2">{group.Gotra || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Mool</td>
            <td className="border px-4 py-2">{group.Mool || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Total Male People</td>
            <td className="border px-4 py-2">{group["Total Male People"]}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Alive</td>
            <td className="border px-4 py-2">{group["Total Male Alive"]}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Deceased</td>
            <td className="border px-4 py-2">{group["Total Male Deceased"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GroupDetailPage;

