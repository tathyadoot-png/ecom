"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Upload, GripVertical, ImageOff } from "lucide-react";
import { toast } from "sonner";

import { createStore, updateMyStore } from "@/services/store.service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  mode?: "create" | "edit";
  initialData?: any;
  onSaved?: () => void;
}

const SECTIONS = [
  { id: "basic", label: "Basic" },
  { id: "images", label: "Images" },
  { id: "craft", label: "Craft" },
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "location", label: "Location" },
  { id: "gallery", label: "Gallery" },
  { id: "video", label: "Video" },
  { id: "business", label: "Business" },
  { id: "social", label: "Social" },
  { id: "seo", label: "SEO" },
];

function SectionCard({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-base font-semibold">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

// A premium image tile: large preview, hover overlay with Replace/
// Remove, and a native HTML5 drop zone — no drag-and-drop library.
function SingleImageUpload({
  label,
  existingUrl,
  aspect = "aspect-square",
  onChange,
}: {
  label: string;
  existingUrl?: string;
  aspect?: string;
  onChange: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const applyFile = (file: File | null) => {
    onChange(file);
    setPreview(file ? URL.createObjectURL(file) : existingUrl || null);
  };

  return (
    <div>
      <Label className="mb-2">{label}</Label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) applyFile(file);
        }}
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-muted/40 transition-colors",
          aspect,
          isDragging ? "border-primary ring-2 ring-ring/30" : "border-border"
        )}
      >
        {preview ? (
          <>
            <Image src={preview} alt={label} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Button type="button" size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
                Replace
              </Button>
              <Button type="button" size="sm" variant="destructive" onClick={() => applyFile(null)}>
                Remove
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Upload size={20} />
            <span className="text-xs">Drop image or click to upload</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => applyFile(e.target.files?.[0] || null)}
      />
    </div>
  );
}

interface GalleryImage {
  key: string;
  url: string;
  file: File | null;
}

function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const addChip = () => {
    const value = draft.trim();
    if (value && !values.includes(value)) onChange([...values, value]);
    setDraft("");
  };

  return (
    <div className="rounded-lg border border-input p-2.5 space-y-2">
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((value) => (
            <span
              key={value}
              className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              {value}
              <button type="button" onClick={() => onChange(values.filter((v) => v !== value))} aria-label={`Remove ${value}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip();
          }
        }}
        onBlur={addChip}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

export default function StoreProfileForm({ mode = "create", initialData, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [portraitImage, setPortraitImage] = useState<File | null>(null);

  const [craft, setCraft] = useState(initialData?.craft || "");
  const [subCraft, setSubCraft] = useState(initialData?.subCraft || "");
  const [specialization, setSpecialization] = useState(initialData?.specialization || "");

  const [shortQuote, setShortQuote] = useState(initialData?.shortQuote || "");
  const [story, setStory] = useState(initialData?.story || "");
  const [craftPhilosophy, setCraftPhilosophy] = useState(initialData?.craftPhilosophy || "");

  const [yearsOfExperience, setYearsOfExperience] = useState(initialData?.yearsOfExperience?.toString() || "");
  const [generation, setGeneration] = useState(initialData?.generation?.toString() || "");
  const [inheritedFrom, setInheritedFrom] = useState(initialData?.inheritedFrom || "");

  const [state, setStateField] = useState(initialData?.state || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [village, setVillage] = useState(initialData?.village || "");
  const [googleMap, setGoogleMap] = useState(initialData?.googleMap || "");

  const [gallery, setGallery] = useState<GalleryImage[]>(
    (initialData?.gallery || []).map((url: string) => ({ key: url, url, file: null }))
  );
  const dragIndexRef = useRef<number | null>(null);

  const [introVideo, setIntroVideo] = useState(initialData?.introVideo || "");

  const [customOrders, setCustomOrders] = useState(initialData?.customOrders || false);
  const [leadTime, setLeadTime] = useState(initialData?.leadTime || "");

  const [instagram, setInstagram] = useState(initialData?.socialLinks?.instagram || "");
  const [facebook, setFacebook] = useState(initialData?.socialLinks?.facebook || "");
  const [youtube, setYoutube] = useState(initialData?.socialLinks?.youtube || "");
  const [website, setWebsite] = useState(initialData?.socialLinks?.website || "");

  const [seoTitle, setSeoTitle] = useState(initialData?.seo?.title || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seo?.description || "");
  const [seoKeywords, setSeoKeywords] = useState<string[]>(initialData?.seo?.keywords || []);

  // Scroll-spy: highlights the section nearest the top of the page as
  // the user scrolls. Uses the document's natural scroll (root: null)
  // — the content column isn't its own scroll container, so the nav
  // can simply stick within the page's normal scroll instead of
  // fighting a second, nested one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGallery((prev) => [
      ...prev,
      ...files.map((file) => ({
        key: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file),
        file,
      })),
    ]);
    e.target.value = "";
  };

  const removeGalleryImage = (key: string) => {
    setGallery((prev) => prev.filter((image) => image.key !== key));
  };

  const moveGalleryImage = (index: number, direction: -1 | 1) => {
    setGallery((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const handleDrop = (dropIndex: number) => {
    const fromIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (fromIndex === null || fromIndex === dropIndex) return;
    setGallery((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      if (craft) formData.append("craft", craft);
      if (subCraft) formData.append("subCraft", subCraft);
      if (specialization) formData.append("specialization", specialization);

      if (shortQuote) formData.append("shortQuote", shortQuote);
      if (story) formData.append("story", story);
      if (craftPhilosophy) formData.append("craftPhilosophy", craftPhilosophy);

      if (yearsOfExperience) formData.append("yearsOfExperience", yearsOfExperience);
      if (generation) formData.append("generation", generation);
      if (inheritedFrom) formData.append("inheritedFrom", inheritedFrom);

      if (state) formData.append("state", state);
      if (city) formData.append("city", city);
      if (village) formData.append("village", village);
      if (googleMap) formData.append("googleMap", googleMap);

      if (introVideo) formData.append("introVideo", introVideo);

      formData.append("customOrders", String(customOrders));
      if (leadTime) formData.append("leadTime", leadTime);

      const socialLinks = { instagram, facebook, youtube, website };
      if (Object.values(socialLinks).some(Boolean)) {
        formData.append("socialLinks", JSON.stringify(socialLinks));
      }

      const seo = { title: seoTitle, description: seoDescription, keywords: seoKeywords };
      if (seoTitle || seoDescription || seoKeywords.length > 0) {
        formData.append("seo", JSON.stringify(seo));
      }

      if (logo) formData.append("logo", logo);
      if (banner) formData.append("banner", banner);
      if (coverImage) formData.append("coverImage", coverImage);
      if (portraitImage) formData.append("portraitImage", portraitImage);

      formData.append("galleryTouched", "true");
      gallery.forEach((image) => {
        formData.append("gallery", image.file || image.url);
      });

      if (mode === "edit") {
        await updateMyStore(formData);
        toast.success("Store profile updated");
      } else {
        await createStore(formData);
        toast.success("Store created successfully");
      }

      onSaved?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save store profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_1fr]">
      {/* Section nav — sticky on desktop, horizontal scroll on mobile.
          `sticky` lives on the INNER div, not `nav` itself: the grid's
          default stretch makes `nav` as tall as the content column, so
          sticky needs a naturally-short inner box to actually "float"
          within that tall cell as the page scrolls. */}
      <nav>
        <div className="flex gap-1 overflow-x-auto pb-2 lg:sticky lg:top-8 lg:flex-col lg:overflow-visible lg:pb-0">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal",
                activeSection === section.id
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Scrollable content */}
      <div className="space-y-6">
        <SectionCard id="basic" title="Basic Information">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Store Name">
              <Input required value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Slug" hint="Generated automatically from the store name.">
              <Input disabled value={initialData?.slug || "(generated when you save)"} />
            </Field>
          </div>
          <Field label="Description">
            <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </SectionCard>

        <SectionCard
          id="images"
          title="Brand Images"
          description="Portrait is the artisan's own photo — shown on the Homepage and Artisan Profile."
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SingleImageUpload label="Portrait" existingUrl={initialData?.portraitImage} onChange={setPortraitImage} />
            <SingleImageUpload label="Logo" existingUrl={initialData?.logo} onChange={setLogo} />
            <SingleImageUpload
              label="Cover Image"
              existingUrl={initialData?.coverImage}
              aspect="aspect-video"
              onChange={setCoverImage}
            />
            <SingleImageUpload
              label="Banner"
              existingUrl={initialData?.banner}
              aspect="aspect-video"
              onChange={setBanner}
            />
          </div>
        </SectionCard>

        <SectionCard id="craft" title="Craft Information">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="Craft">
              <Input value={craft} onChange={(e) => setCraft(e.target.value)} placeholder="e.g. Blue Pottery" />
            </Field>
            <Field label="Sub Craft">
              <Input value={subCraft} onChange={(e) => setSubCraft(e.target.value)} />
            </Field>
            <Field label="Specialization">
              <Input value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="story" title="Story">
          <Field label={`Short Quote (${shortQuote.length}/200)`}>
            <Textarea
              rows={2}
              maxLength={200}
              value={shortQuote}
              onChange={(e) => setShortQuote(e.target.value.slice(0, 200))}
            />
          </Field>
          <Field label="Story">
            <Textarea rows={7} value={story} onChange={(e) => setStory(e.target.value)} />
          </Field>
          <Field label="Craft Philosophy">
            <Textarea rows={3} value={craftPhilosophy} onChange={(e) => setCraftPhilosophy(e.target.value)} />
          </Field>
        </SectionCard>

        <SectionCard id="experience" title="Experience">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="Years of Experience">
              <Input
                type="number"
                min={0}
                max={100}
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </Field>
            <Field label="Generation" hint="e.g. 3 for third-generation">
              <Input type="number" min={1} max={20} value={generation} onChange={(e) => setGeneration(e.target.value)} />
            </Field>
            <Field label="Inherited From">
              <Input value={inheritedFrom} onChange={(e) => setInheritedFrom(e.target.value)} placeholder="e.g. Grandfather" />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="location" title="Location">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="State">
              <Input value={state} onChange={(e) => setStateField(e.target.value)} />
            </Field>
            <Field label="City">
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </Field>
            <Field label="Village">
              <Input value={village} onChange={(e) => setVillage(e.target.value)} />
            </Field>
          </div>
          <Field label="Google Map URL">
            <Input type="url" value={googleMap} onChange={(e) => setGoogleMap(e.target.value)} placeholder="https://maps.google.com/..." />
          </Field>
        </SectionCard>

        <SectionCard
          id="gallery"
          title="Gallery"
          description="Drag tiles to reorder, or use the arrow buttons. Hover a tile to remove it."
        >
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-input py-6 text-sm text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
            <Upload size={16} />
            Add gallery images
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryAdd} />
          </label>

          {gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {gallery.map((image, index) => (
                <div
                  key={image.key}
                  draggable
                  onDragStart={() => (dragIndexRef.current = index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  className="group relative aspect-square cursor-grab overflow-hidden rounded-xl border border-border active:cursor-grabbing"
                >
                  <Image src={image.url} alt="Gallery" fill className="object-cover" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white">
                      <GripVertical size={13} />
                    </span>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(image.key)}
                      aria-label="Remove image"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => moveGalleryImage(index, -1)}
                      disabled={index === 0}
                      aria-label="Move earlier"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-foreground disabled:opacity-30"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => moveGalleryImage(index, 1)}
                      disabled={index === gallery.length - 1}
                      aria-label="Move later"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-foreground disabled:opacity-30"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {gallery.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
              <ImageOff size={20} />
              <p className="text-sm">No gallery images yet</p>
            </div>
          )}
        </SectionCard>

        <SectionCard id="video" title="Video">
          <Field label="Intro Video URL">
            <Input type="url" value={introVideo} onChange={(e) => setIntroVideo(e.target.value)} placeholder="https://youtube.com/..." />
          </Field>
        </SectionCard>

        <SectionCard id="business" title="Business">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-end">
            <Field label="Lead Time" hint="e.g. 2-3 weeks">
              <Input value={leadTime} onChange={(e) => setLeadTime(e.target.value)} />
            </Field>
            <label className="flex items-center gap-2.5 pb-2.5">
              <Switch checked={customOrders} onCheckedChange={setCustomOrders} />
              <span className="text-sm font-medium">Accepts Custom Orders</span>
            </label>
          </div>
        </SectionCard>

        <SectionCard id="social" title="Social Links">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Instagram">
              <Input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            </Field>
            <Field label="Facebook">
              <Input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
            </Field>
            <Field label="YouTube">
              <Input type="url" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
            </Field>
            <Field label="Website">
              <Input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="seo" title="SEO">
          <Field label="SEO Title">
            <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </Field>
          <Field label="SEO Description">
            <Textarea rows={3} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
          </Field>
          <Field label="SEO Keywords">
            <ChipInput values={seoKeywords} onChange={setSeoKeywords} placeholder="Type a keyword and press Enter" />
          </Field>
        </SectionCard>

        <div className="flex justify-end pb-2">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? (mode === "edit" ? "Saving..." : "Creating...") : mode === "edit" ? "Save Changes" : "Create Store"}
          </Button>
        </div>
      </div>
    </form>
  );
}
