import { Box, Typography, Chip } from "@mui/material";
import {
  Star,
  AccessibleForward,
  Business,
  LocalOffer,
} from "@mui/icons-material";
import { Asset } from "../services/api/AssetService";
import {
  GROUP_BOX_BG,
  GROUP_BOX_RADIUS,
  GROUP_BOX_SHADOW,
} from "../constants/constantPalette";

interface AssetMetadataProps {
  asset: Asset;
}

const renderPriceLevel = (level?: string) => {
  if (!level) return null;
  const priceMap: Record<string, string> = {
    PRICE_LEVEL_FREE: "💰",
    PRICE_LEVEL_INEXPENSIVE: "💰💰",
    PRICE_LEVEL_MODERATE: "💰💰💰",
    PRICE_LEVEL_EXPENSIVE: "💰💰💰💰",
    PRICE_LEVEL_VERY_EXPENSIVE: "💰💰💰💰💰",
  };
  return priceMap[level] || null;
};

export const AssetMetadata = ({ asset }: AssetMetadataProps) => {
  return (
    <Box
      sx={{
        minWidth: "500px",
        bgcolor: GROUP_BOX_BG,
        borderRadius: GROUP_BOX_RADIUS,
        p: 2,
        boxShadow: GROUP_BOX_SHADOW,
        height: "470px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Business Info Card */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
          }}
        >
          <Business /> Business Info
        </Typography>

        {asset.priceLevel && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Price Level
            </Typography>
            <Typography>{renderPriceLevel(asset.priceLevel)}</Typography>
          </Box>
        )}

        {asset.rating && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Rating
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Star sx={{ color: "gold" }} />
              <Typography>{asset.rating} / 5</Typography>
              {asset.userRatingCount && (
                <Typography variant="caption">
                  ({asset.userRatingCount} reviews)
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {asset.accessibilityOptions?.wheelchairAccessibleEntrance && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessibleForward color="primary" />
            <Typography>Wheelchair Accessible</Typography>
          </Box>
        )}
      </Box>

      {/* Tags/Types */}
      {((asset.types?.length ?? 0) > 0 || (asset.aiTags?.length ?? 0) > 0) && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
            }}
          >
            <LocalOffer /> Categories & Tags
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {asset.types?.map((type, index) => (
              <Chip
                key={index}
                label={type.replace(/_/g, " ").toLowerCase()}
                size="small"
                variant="outlined"
              />
            ))}
            {asset.aiTags?.map((tag, index) => (
              <Chip
                key={`ai-${index}`}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
