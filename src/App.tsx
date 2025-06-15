
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScheduledPosts from "./pages/ScheduledPosts";
import Drafts from "./pages/Drafts";
import MediaLibrary from "./pages/MediaLibrary";
import Analytics from "./pages/Analytics";
import ConnectedAccountsPage from "./pages/ConnectedAccounts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scheduled-posts" element={<ScheduledPosts />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/media-library" element={<MediaLibrary />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/connected-accounts" element={<ConnectedAccountsPage />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
