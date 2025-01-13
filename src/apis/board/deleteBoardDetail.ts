import request from "../../libs/axios";

interface DeleteBoardParameter {
  id: number;
}

async function deleteBoardDetail({ id }: DeleteBoardParameter) {
  const res = await request.delete(`/board/${id}`);

  return res.data;
}

export default deleteBoardDetail;
