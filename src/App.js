import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./modules/MainPage";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
