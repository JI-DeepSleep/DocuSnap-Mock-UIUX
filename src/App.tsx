
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import CameraCapture from "./pages/CameraCapture";
import LocalMedia from "./pages/LocalMedia";
import ImageProcessing from "./pages/ImageProcessing";
import UploadedFormSelection from "./pages/UploadedFormSelection";
import FillForm from "./pages/FillForm";
import AccessDocument from "./pages/AccessDocument";
import DocumentTextualInfo from "./pages/DocumentTextualInfo";
import DocumentImage from "./pages/DocumentImage";
import DocumentDisplay from "./pages/DocumentDisplay";
import AccessForm from "./pages/AccessForm";
import FormDisplay from "./pages/FormDisplay";
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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/camera" element={<CameraCapture />} />
          <Route path="/local-media" element={<LocalMedia />} />
          <Route path="/image-processing" element={<ImageProcessing />} />
          <Route path="/form-selection" element={<UploadedFormSelection />} />
          <Route path="/fill-form" element={<FillForm />} />
          <Route path="/access-document" element={<AccessDocument />} />
          <Route path="/document-info" element={<DocumentTextualInfo />} />
          <Route path="/document-images" element={<DocumentImage />} />
          <Route path="/document-display/:id" element={<DocumentDisplay />} />
          <Route path="/access-form" element={<AccessForm />} />
          <Route path="/form-display/:id" element={<FormDisplay />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
