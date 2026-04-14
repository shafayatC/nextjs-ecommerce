'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { MediaGrid, MediaPreviewModal } from '@/components/features/media/media-grid';
import { MediaUploadModal } from '@/components/features/media/media-upload';
import { mediaItems, MediaItem } from '@/lib/mock-data';

export default function MediaPage() {
  const [mediaList, setMediaList] = useState(mediaItems);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (item: MediaItem) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const handleUpload = (files: FileList) => {
    const newItems: MediaItem[] = Array.from(files).map((file, index) => ({
      id: String(mediaList.length + index + 1),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: '',
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      createdAt: new Date().toISOString().split('T')[0],
    }));
    setMediaList([...newItems, ...mediaList]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage your images and videos</p>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Select
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'image', label: 'Images' },
            { value: 'video', label: 'Videos' },
          ]}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full sm:w-48"
        />
      </div>

      <MediaGrid
        items={mediaList}
        filterType={filterType}
        searchQuery={searchQuery}
        onPreview={handlePreview}
      />

      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      <MediaPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        item={previewItem}
      />
    </div>
  );
}
