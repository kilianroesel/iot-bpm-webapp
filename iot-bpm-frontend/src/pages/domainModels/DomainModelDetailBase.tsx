import { QueryClient } from "@tanstack/react-query";
import { domainModelQuery } from "../../iotBpmBackend/api";
import { LoaderFunctionArgs, NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
      throw new Error("No domain model ID provided");
    }
    const domainModel = await queryClient.ensureQueryData(domainModelQuery(params.id));
    return domainModel;
  };

export default function DomainModelDetailBase() {
  const domainModel = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-md bg-blue-700 p-4">
          <div className="text-lg">Scope</div>
          <div>{domainModel.scope.machineName}</div>
          <div>{domainModel.scope.versionCsiStd}</div>
          <div>{domainModel.scope.versionCsiSpecific}</div>
          <div>{domainModel.scope.machineSoftwareVersion}</div>
          <div>{domainModel.scope.machineMasterSoftwareVersion}</div>
        </div>
        <div className="col-span-2 rounded-md bg-blue-700 p-4">
          <div className="text-lg">Topology</div>
        </div>
      </div>
      <Breadcrumbs equipment={domainModel} />
      <Outlet />
    </div>
  );
}

function Breadcrumbs({ equipment }: { equipment: any }) {
  const params = useParams();

  const crumbs: { name: string; link: string }[] = [
    {
      name: equipment.name,
      link: "",
    },
  ];

  var curPath: string[] = [];
  if (params["*"]) {
    var curPath: string[] = [];
    equipment = params["*"]
      .split("/")
      .flatMap((subEquipment) => ["subEquipment", subEquipment])
      .reduce((acc, path) => {
        if (acc) {
          if (path != "subEquipment") {
            curPath.push(path);
            console.log(path);
            crumbs.push({
              name: acc[path].name,
              link: curPath.join("/"),
            });
          }
          return acc[path];
        }
      }, equipment);
  }
  
  var linkPrefix = "";
  if (curPath.length > 0)
    linkPrefix = curPath.join("/") + "/";

  console.log(curPath);
  const furtherLinks: { name: string; link: string }[] = Object.entries(equipment.subEquipment).map(([key, value]) => (
    {
      name: "hallo",
      link: linkPrefix + key,
    }
  ));

  return (
    <div>
      <ul>
        {crumbs.map((crumb) => (
          <li key={crumb.link}>
            <NavLink to={crumb.link}>{crumb.name}</NavLink>
          </li>
        ))}
        {furtherLinks.map((crumb) => (
          <li key={crumb.link}>
            <NavLink to={crumb.link}>{crumb.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
