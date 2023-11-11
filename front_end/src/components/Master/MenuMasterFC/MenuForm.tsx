import React, { useEffect } from "react";
import {  useForm } from "react-hook-form";
import MastersHeader from "../../../layouts/MastersHeader";
import {  CheckboxController,  InputController, SelectController } from "../../../control";
import { useNavigate, useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { Box, Button, Grid,  Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getbyIdMenuMaster,
  getSaveUpdateMenuMaster,
} from "../../../store/Master/menuMaster";
import { ModuleOptionHook } from "../../../hooks/masters/moduleMasterHook";
import { MenuOptionHook } from "../../../hooks/masters/menuMasterHook";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const MenuForm = () => {
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const loaderStatus = useSelector(selectStatus);
  const getByIdMenuMaster = useSelector(getbyIdMenuMaster);
  const getSaveMenuMaster = useSelector(getSaveUpdateMenuMaster);
  const { optionModuleData: moduleOptions } = ModuleOptionHook(true);
  const { optionMenuData: menuOptions } = MenuOptionHook(true);

  const menuSchema=yup.object({
    name:yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required('Please enter Menu'),
    parentId:yup.string().matches(/^[0-9 ]*$/, 'Please select Parent').required('Please select Parent'),
    moduleMasterId:yup.string().matches(/^[0-9 ]*$/, 'Please select Module').required('Please Select Module Name'),
    url:yup.string().required('Please enter URL'),
    icon:yup.string().matches(/^[a-zA-Z0-9 ]*$/, 'Enter characters and Number only').required('Please enter Icon'),
    precedence:yup.string().matches(/^[0-9 ]*$/, 'Enter only Number').required('Please enter Precedence'),
    isMenu:yup.boolean().notRequired(),
    id:yup.number().required(),
    isActive:yup.boolean().notRequired(),
  })

  const { control, handleSubmit, setValue,  watch, reset ,resetField } =
    useForm({
      defaultValues: {
        name: "",
        parentId:  '',
        moduleMasterId:  '',
        url: "",
        icon: "",
        precedence: id && getByIdMenuMaster && getByIdMenuMaster.precedence ?getByIdMenuMaster.precedence :'',
        id:id?Number(id):0,
        isMenu: false,
        isActive: false,
      },
      resolver:yupResolver(menuSchema),
      mode:'onChange'
    });



  useEffect(() => {
    if (id) {
      const fetchGetbyIDMenuData = async () => {
        try {
          dispatch(actions.loadGetByIdMenuMaster(parseInt(id)));
        } catch (error: any) {}
      };
      fetchGetbyIDMenuData();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      const setGetbyIDMenuData = async () => {
        try {
          if (getByIdMenuMaster) {
            setValue("name", getByIdMenuMaster.name);
            setValue("icon", getByIdMenuMaster.icon);
            setValue("url", getByIdMenuMaster.url);
            setValue("moduleMasterId", getByIdMenuMaster && getByIdMenuMaster.moduleMasterId ?getByIdMenuMaster.moduleMasterId : 0 );
            setValue("parentId", getByIdMenuMaster.parentId);
            setValue("precedence", getByIdMenuMaster.precedence);
            setValue("isActive", getByIdMenuMaster.isActive);
          }
        } catch (error: any) {}
      };
      setGetbyIDMenuData();
    }
  }, [getByIdMenuMaster, id, setValue]);


  const onSubmit = (data:any) => {
    id ? updateMenu() : addMenu();
  };
  const addMenu = () => {
    try {
      const request = watch()
      dispatch(actions.loadSaveUpdateMenuMaster({ request, type: "ADD" }));
    } catch (error) {}
  };
  const updateMenu = () => {
    try {
      const request = watch();
      dispatch(actions.loadSaveUpdateMenuMaster({request, type: "EDIT" }));
    } catch (error) {}
  };

  useEffect(() => {
    if (getSaveMenuMaster) {
      const redirectToList = async () => {
        if (
          (getSaveMenuMaster && getSaveMenuMaster.statusCode === ADD) ||
          getSaveMenuMaster.statusCode === UPDATE
        ) {
          navigate("/menu");
        }
      };
      redirectToList();
    }
  }, [getSaveMenuMaster, navigate]);

  const navigateToMenuList = () => {
    dispatch(actions.setSaveUpdateMenuMaster(null));
    navigate("/menu");
    reset();
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Menu" : "Add Menu"}
          BreadcrumbTitle={"Menu"}
          BreadcrumSubTitle={id ? "Edit Menu" : "Add Menu"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>

      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid item container spacing={2}>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <InputController control={control} name='name' label="Name" resetClick={()=>resetField('name')} />
                </Grid>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <SelectController control={control} name='parentId' label="Parent Name" options={menuOptions} />
                </Grid>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <SelectController control={control} name='moduleMasterId' label="Module Name" options={moduleOptions}  />
                </Grid>
              </Grid>

              <Grid item container spacing={2}>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <InputController control={control} name='url' label="URL" resetClick={()=>resetField('url')} />
                </Grid>

                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <InputController control={control} name='icon' label="ICON" resetClick={()=>resetField('icon')} />
                </Grid>

                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={12}
                  sm={12}
                  md={4}
                >

                  <InputController control={control} name='precedence' label="Precedence" resetClick={()=>resetField('precedence')} />

                </Grid>
              </Grid>

              <Grid item container spacing={2}>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={3}
                  sm={3}
                  md={1}
                >

                <CheckboxController control={control} name='isMenu' label="Menu"  />
                </Grid>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={3}
                  sm={3}
                  md={1}
                >
                <CheckboxController control={control} name='isActive' label="Active"  />

                </Grid>
              </Grid>

              <Grid item container spacing={1}>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={3}
                  sm={3}
                  md={1}
                >
                  {" "}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttonLayout}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={3}
                  sm={3}
                  md={1}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={navigateToMenuList}
                    className={classes.buttonLayout}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default MenuForm;
