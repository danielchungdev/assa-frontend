import React from 'react'
import { Slot, Stack } from 'expo-router'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false, title: 'Home' }} />
        </Stack>
      </Provider>
    </QueryClientProvider >

  )
}

export default RootLayout
