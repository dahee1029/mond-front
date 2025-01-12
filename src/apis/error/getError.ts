import request from "../../libs/axios";
import { GetBoardListResponse } from "../board/getBoardList";

async function getError() {
  const res = await request.get<GetBoardListResponse[]>("/error");
  return res.data;
}

export default getError;
