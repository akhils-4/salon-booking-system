import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { motion } from "framer-motion";

const BecomePartnerFormStep3 = ({ formik }) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const image = await uploadToCloudinary(file); // should return { url, public_id }
    formik.setFieldValue("salonDetails.images", [
      ...formik.values.salonDetails.images,
      image,
    ]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.salonDetails.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("salonDetails.images", updatedImages);
  };

  return (
    <Box className="space-y-6">
      <p className="text-xl font-bold text-center">Salon Details</p>

      {/* Image Upload Section */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="fileInput" className="relative cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-md"
          >
            <AddPhotoAlternate className="text-gray-500 text-3xl" />
          </motion.div>
          {uploadingImage && (
            <div className="absolute left-0 top-0 w-24 h-24 flex items-center justify-center bg-white/70 rounded-md">
              <CircularProgress size={24} />
            </div>
          )}
        </label>

        {/* Uploaded Images */}
        <div className="flex flex-wrap gap-2">
          {formik.values?.salonDetails?.images.map((image, index) => (
            <motion.div
              key={image.public_id || index}
              whileHover={{ scale: 1.05 }}
              className="relative w-24 h-24"
            >
              <img
                src={image.url || image} // handle both URL string or Cloudinary object
                alt={`Salon Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md shadow-md"
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                size="small"
                color="error"
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Close fontSize="small" />
              </IconButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Salon Name */}
      <TextField
        fullWidth
        label="Salon Name"
        name="salonDetails.name"
        value={formik.values.salonDetails.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="bg-gray-50 rounded-md"
      />

      {/* Open Time */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileTimePicker
            label="Open Time"
            value={formik.values.salonDetails.openTime || null}
            onChange={(newValue) =>
              formik.setFieldValue("salonDetails.openTime", newValue)
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      {/* Close Time */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileTimePicker
            label="Close Time"
            value={formik.values.salonDetails.closeTime || null}
            onChange={(newValue) =>
              formik.setFieldValue("salonDetails.closeTime", newValue)
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};

export default BecomePartnerFormStep3;
