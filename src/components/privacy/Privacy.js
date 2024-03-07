import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Select, FormControl, MenuItem } from '@mui/material';

import { termswithlanguagePrivacy } from '../../utils/privacy';

export default function Terms() {
  const [languages, setLanguages] = useState('English');

  const terms = termswithlanguagePrivacy(languages);

  const handleLaguangeChnage = (e) => {
    setLanguages(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Privacy and Policy | Marsa </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Privacy and Policy
          </Typography>
          <FormControl>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={languages}
              sx={{
                fontSize: '12px',
                height: '30px',
                marginLeft: '10px',
              }}
              onChange={handleLaguangeChnage}
            >
              <MenuItem value={'English'}>English</MenuItem>
              <MenuItem value={'Arabic'}>Arabic</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Card sx={{ padding: '40px', direction: languages === 'Arabic' ? 'rtl' : 'ltr' }}>
          <Stack spacing={2}>
            <Typography fontSize={'32px'} fontWeight={700} textAlign={'center'}>
              {terms.h1}
            </Typography>
            <Typography fontSize={'14px'} fontWeight={400} textAlign={'center'}>
              {terms.p1}
            </Typography>

            {terms.textComponents.map((item, index) => (
              <Stack p={2} spacing={1} key={index}>
                <Typography fontSize={'26px'} fontWeight={600}>
                  {item.h}
                </Typography>
                <Typography fontSize={'14px'} fontWeight={400}>
                  {item.p}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
