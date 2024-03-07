import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import BoatService from '../redux/api/BoatService';
import { getAllBoat } from '../redux/slice/boatSlice';
import { IMAGE_BASEURL } from '../redux/api/http-common';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'craftName', label: 'Name', alignRight: false },
  { id: 'boatType', label: 'Boat Type', alignRight: false },
  { id: 'typeOfCraftType', label: 'Type Of Craft Type', alignRight: false },
  { id: 'waterCraftType', label: 'Water Craft Type', alignRight: false },
  { id: 'rentPerHour', label: 'Rent Per Hour', alignRight: false },
  { id: 'guestCapicty', label: 'Guest Capicty', alignRight: false },
  { id: 'maxHour', label: 'Max Hour', alignRight: false },
  { id: 'minHour', label: 'Min Hour', alignRight: false },
  { id: 'experience', label: 'Experience', alignRight: false },
  { id: 'loa', label: 'LOA', alignRight: false },
  { id: 'resume', label: 'Resume', alignRight: false },
  { id: 'isSlider', label: 'Slider Status', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'images', label: 'Images', alignRight: false },
  { id: 'Action', label: 'Action', alignRight: false },
  { id: '' },
];
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.craftName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BoatPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const boatData = useSelector((state) => state.boat.data);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [getId, setGetId] = useState(null);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setGetId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - boatData.length) : 0;

  const filteredUsers = applySortFilter(
    !boatData || boatData.length === 0 ? [] : boatData,
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = !filteredUsers.length && !!filterName;

  const handleDelete = async () => {
    await BoatService.deletes(getId)
      .then((res) => {
        toast.success(res.data.message);
        handleCloseMenu();
        dispatch(getAllBoat());
      })
      .catch((error) => {
        if (!error.response.data) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleVerify = async (id) => {
    await BoatService.verify(id)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllBoat());
      })
      .catch((error) => {
        if (!error.response.data) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleSlider = async (id) => {
    await BoatService.slider(id)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllBoat());
      })
      .catch((error) => {
        if (!error.response.data) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> Boats | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Boats
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      _id,
                      craftName,
                      boatType,
                      typeOfCraftType,
                      waterCraftType,
                      rentPerHour,
                      guestCapicty,
                      maxHour,
                      minHour,
                      status,
                      description,
                      images,
                      isSlider,
                      experience,
                      loa,
                      resume,
                    } = row;

                    return (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">{!craftName ? 'N/A' : craftName}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{!boatType ? 'N/A' : boatType}</TableCell>

                        <TableCell align="left">
                          {!typeOfCraftType || typeOfCraftType.length === 0 ? 'N/A' : typeOfCraftType.join(', ')}
                        </TableCell>

                        <TableCell align="left">{!waterCraftType ? 'N/A' : waterCraftType}</TableCell>

                        <TableCell align="left">{!rentPerHour ? 'N/A' : rentPerHour}</TableCell>

                        <TableCell align="left">{!guestCapicty ? 'N/A' : guestCapicty}</TableCell>

                        <TableCell align="left">{!maxHour ? 'N/A' : maxHour}</TableCell>

                        <TableCell align="left">{!minHour ? 'N/A' : minHour}</TableCell>

                        <TableCell align="left">{!experience ? 'N/A' : experience}</TableCell>

                        <TableCell align="left">{!loa ? 'N/A' : loa}</TableCell>

                        <TableCell align="left">{!resume ? 'N/A' : resume}</TableCell>

                        <TableCell align="left">
                          <Label color={(isSlider === false && 'error') || 'success'}>
                            {isSlider === false ? 'No' : 'Yes'}
                          </Label>
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(status === false && 'error') || 'success'}>
                            {status === false ? 'Not Verified' : 'Verified'}
                          </Label>
                        </TableCell>

                        <TableCell align="left">{!description ? 'N/A' : description.slice(0, 100)}</TableCell>

                        <TableCell align="left">
                          {!images || images.length === 0 ? (
                            'N/A'
                          ) : (
                            <img
                              src={IMAGE_BASEURL + images[0]}
                              height={'100px'}
                              alt={!craftName ? 'N/A' : craftName}
                            />
                          )}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleVerify(_id);
                            }}
                          >
                            {status === false ? 'Verify' : 'Block'}
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{ lineHeight: '20px', margin: '5px' }}
                            onClick={() => {
                              handleSlider(_id);
                            }}
                          >
                            {isSlider === false ? 'Add Slider' : 'Delete Slider'}
                          </Button>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) => {
                              handleOpenMenu(event, _id);
                            }}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => navigate(`/dashboard/boats/detail/${getId}`)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          View
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
