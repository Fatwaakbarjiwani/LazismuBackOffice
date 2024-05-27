import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/action/campaignAction";
import { Table } from "flowbite-react";

function User() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-3xl font-bold font-Inter text-left pt-4">
        Pengguna
      </h1>
      <div className="overflow-x-auto">
        <Table hoverable className="my-5">
          <Table.Head className="text-sm">
            <Table.HeadCell className="w-3/6">Nama</Table.HeadCell>
            <Table.HeadCell>No Telefone</Table.HeadCell>
            <Table.HeadCell>created</Table.HeadCell>
            <Table.HeadCell>Alamat</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-2xl">
                  {item.username}
                </Table.Cell>
                <Table.Cell>{item.phoneNumber}</Table.Cell>
                <Table.Cell>{item.createdAt}</Table.Cell>
                <Table.Cell>{item?.address || "BELUM DI ISI"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default User;
