import { useEffect, useState } from "react";
import { IRelationMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllRelationMaster,
  getOptionRelationMaster,
} from "../../store/GlobalMaster/relationMaster";
export const RelationHook = (loadingRelation: boolean) => {
  const [data, setData] = useState<IRelationMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getRelationListData = useSelector(getAllRelationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingRelation) {
      fetchData();
    }
  }, [loadingRelation]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdRelationMaster(null));
    dispatch(actions.setSaveUpdateRelationMaster(null));
  };
  useEffect(() => {
    if (getRelationListData && getRelationListData.length > 0) {
      setData([...getRelationListData]);
    }
  }, [getRelationListData]);

  return { data, loading, setData };
};

export const RelationOptionHook = (loadingOptionRelation: boolean) => {
  const [relationoptiondata, seRelationOptionData] = useState<
    IRelationMaster[]
  >([]);
  const [relationoptionloading, setRelationOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getRelationOptionListData = useSelector(getOptionRelationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionRelation());
      } catch (error: any) {
        seRelationOptionData([]);
      }
    };
    if (loadingOptionRelation) {
      fetchData();
    }
  }, [loadingOptionRelation]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdRelationMaster(null));
    dispatch(actions.setSaveUpdateRelationMaster(null));
  };
  useEffect(() => {
    seRelationOptionData([...getRelationOptionListData]);
  }, [getRelationOptionListData]);

  return { relationoptiondata, relationoptionloading, seRelationOptionData };
};
