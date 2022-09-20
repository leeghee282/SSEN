// 보유 원화 전체 목록으로 보여주기
import React from "react";
import MyAssetItem from "../MyAssetItem";
import Box from "@mui/material/Box";

export default function MyAssetItemList({ myAsset, onRemove }) {
  return (
    <Box>
      {myAsset.map((repo) => (
        <MyAssetItem repo={repo} key={repo.id} onRemove={onRemove}></MyAssetItem>
      ))}
    </Box>
  );
}
