import React, { useState, useEffect } from "react";
import {
  Camera,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  LogOut,
  Edit3,
  ThumbsUp,
  MessageSquare,
  Share2,
  Search,
  Home,
  Tv,
  Store,
  Users,
  Gamepad2,
  Bell,
  Grid,
  Send,
  MoreHorizontal,
  Smile,
  Image as ImageIcon,
  Video,
  UserCheck,
  Briefcase,
  GraduationCap,
  Globe,
  Check,
} from "lucide-react";
import { RegisteredUserSummary } from "./SignupForm";

interface ProfileSummaryProps {
  summary: RegisteredUserSummary;
  onLogout: () => void;
  onEditRegistration: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  summary,
  onLogout,
  onEditRegistration,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState(
    `Connecting with friends and communities globally from ${summary.city}, ${summary.country.name}.`
  );
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [posts, setPosts] = useState<Array<{ id: string; text: string; time: string; likes: number; liked: boolean }>>([
    {
      id: "post-1",
      text: `Hello ConnectBook! Just joined the platform from ${summary.city}, ${summary.country.name} ${summary.country.flag}. Excited to connect with everyone worldwide!`,
      time: "Just now",
      likes: 42,
      liked: false,
    },
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "friends" | "photos">("posts");

  // Handle local avatar file upload via URL.createObjectURL
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setAvatarUrl(newUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const handleSaveBio = () => {
    setBio(editedBio);
    setIsEditingBio(false);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setPosts([
      {
        id: `post-${Date.now()}`,
        text: newPostText.trim(),
        time: "Just now",
        likes: 0,
        liked: false,
      },
      ...posts,
    ]);
    setNewPostText("");
  };

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const maskEmail = (email: string) => {
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 2) return `${name}***@${domain}`;
    return `${name[0]}***${name[name.length - 1]}@${domain}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] text-[#1c1e21] dark:text-[#e4e6eb] font-sans -mt-8 sm:-mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Facebook Authenticated Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white dark:bg-[#242526] border-b border-[#dadde1] dark:border-[#393a3b] shadow-xs px-4 flex items-center justify-between">
        {/* Left: ConnectBook Logo & Search */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white font-bold text-2xl select-none">
            cb
          </div>
          <div className="relative hidden sm:flex items-center">
            <Search className="w-4 h-4 text-[#65676b] dark:text-[#b0b3b8] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ConnectBook"
              className="h-10 pl-9 pr-4 w-60 rounded-full bg-[#f0f2f5] dark:bg-[#3a3b3c] text-sm text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#65676b] dark:placeholder:text-[#b0b3b8] focus:outline-none"
            />
          </div>
        </div>

        {/* Center: Navigation Icons */}
        <div className="hidden md:flex items-center h-full gap-1 lg:gap-2">
          <button
            className="h-full px-6 lg:px-10 border-b-[3px] border-[#1877f2] text-[#1877f2] flex items-center justify-center cursor-pointer"
            title="Home"
          >
            <Home className="w-7 h-7" />
          </button>
          <button
            className="h-full px-6 lg:px-10 border-b-[3px] border-transparent text-[#65676b] dark:text-[#b0b3b8] hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-lg flex items-center justify-center cursor-pointer"
            title="Video"
          >
            <Tv className="w-7 h-7" />
          </button>
          <button
            className="h-full px-6 lg:px-10 border-b-[3px] border-transparent text-[#65676b] dark:text-[#b0b3b8] hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-lg flex items-center justify-center cursor-pointer"
            title="Marketplace"
          >
            <Store className="w-7 h-7" />
          </button>
          <button
            className="h-full px-6 lg:px-10 border-b-[3px] border-transparent text-[#65676b] dark:text-[#b0b3b8] hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-lg flex items-center justify-center cursor-pointer"
            title="Groups"
          >
            <Users className="w-7 h-7" />
          </button>
          <button
            className="h-full px-6 lg:px-10 border-b-[3px] border-transparent text-[#65676b] dark:text-[#b0b3b8] hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-lg flex items-center justify-center cursor-pointer"
            title="Gaming"
          >
            <Gamepad2 className="w-7 h-7" />
          </button>
        </div>

        {/* Right: Controls & User Avatar */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] flex items-center justify-center text-[#050505] dark:text-[#e4e6eb] cursor-pointer"
            title="Menu"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] flex items-center justify-center text-[#050505] dark:text-[#e4e6eb] cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] rounded-full text-xs font-semibold cursor-pointer"
            title="Log out of ConnectBook"
          >
            <div className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-xs overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                `${summary.firstName[0]}${summary.lastName[0]}`
              )}
            </div>
            <span className="hidden sm:inline font-bold">{summary.firstName}</span>
            <LogOut className="w-3.5 h-3.5 text-[#65676b] dark:text-[#b0b3b8]" />
          </button>
        </div>
      </header>

      {/* Main Facebook Profile Container */}
      <div className="max-w-[1095px] mx-auto">
        {/* Cover Photo & Header Section */}
        <div className="bg-white dark:bg-[#242526] shadow-xs">
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-72 md:h-88 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#1877f2] rounded-b-lg overflow-hidden flex items-end justify-end p-4">
            <button
              type="button"
              className="px-3.5 py-1.5 bg-white/90 dark:bg-black/70 hover:bg-white text-xs font-semibold rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer text-[#050505] dark:text-white"
            >
              <Camera className="w-4 h-4" />
              <span>Edit cover photo</span>
            </button>
          </div>

          {/* Profile Header Details */}
          <div className="max-w-[1050px] mx-auto px-4 sm:px-8 pb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-8 gap-4 pb-4 border-b border-[#dadde1] dark:border-[#3a3b3c]">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-[#242526] bg-[#1877f2] flex items-center justify-center text-white font-extrabold text-5xl shadow-md overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{summary.firstName[0]}{summary.lastName[0]}</span>
                    )}
                  </div>
                  <label
                    htmlFor="profile-avatar-upload"
                    className="absolute bottom-2 right-2 p-2 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] text-[#050505] dark:text-white rounded-full shadow-md cursor-pointer border-2 border-white dark:border-[#242526]"
                    title="Update profile picture"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="profile-avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="sr-only"
                    />
                  </label>
                </div>

                {/* Name & Friends */}
                <div className="mb-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-[32px] font-bold text-[#050505] dark:text-[#e4e6eb] leading-tight">
                      {summary.firstName} {summary.lastName}
                    </h1>
                    <span className="w-5 h-5 rounded-full bg-[#1877f2] flex items-center justify-center text-white text-[10px]" title="Verified ConnectBook Account">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  </div>
                  <p className="text-[#65676b] dark:text-[#b0b3b8] text-[15px] font-normal mt-0.5">
                    1.2K friends · 2 mutual
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-2 w-full sm:w-auto justify-center">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-sm rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-none"
                >
                  <span>+ Add to story</span>
                </button>
                <button
                  type="button"
                  onClick={onEditRegistration}
                  className="px-4 py-2 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] text-[#050505] dark:text-[#e4e6eb] font-semibold text-sm rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit profile</span>
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-2 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] text-[#050505] dark:text-[#e4e6eb] rounded-md transition-colors cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 pt-1 text-sm font-semibold text-[#65676b] dark:text-[#b0b3b8] overflow-x-auto">
              {[
                { id: "posts", label: "Posts" },
                { id: "about", label: "About" },
                { id: "friends", label: "Friends" },
                { id: "photos", label: "Photos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 border-b-[3px] transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#1877f2] text-[#1877f2]"
                      : "border-transparent hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-md"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Column Profile Feed Content */}
        <div className="px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Intro & Profile Attributes */}
          <div className="lg:col-span-5 space-y-4">
            {/* Intro Card */}
            <div className="bg-white dark:bg-[#242526] rounded-lg shadow-xs border border-[#dadde1] dark:border-[#3a3b3c] p-4 space-y-3">
              <h2 className="text-xl font-bold text-[#050505] dark:text-[#e4e6eb]">Intro</h2>

              {/* Bio */}
              <div className="text-center py-1">
                {isEditingBio ? (
                  <div className="space-y-2">
                    <textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      className="w-full p-2 text-sm bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-md border border-[#ccd0d5] dark:border-[#4e4f50] focus:outline-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingBio(false)}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#e4e6eb] dark:bg-[#3a3b3c] rounded-md cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveBio}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#1877f2] text-white rounded-md cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-[#050505] dark:text-[#e4e6eb]">{bio}</p>
                    <button
                      type="button"
                      onClick={() => setIsEditingBio(true)}
                      className="mt-2.5 w-full py-1.5 px-3 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] text-[#050505] dark:text-[#e4e6eb] font-semibold text-sm rounded-md transition-colors cursor-pointer"
                    >
                      Edit bio
                    </button>
                  </div>
                )}
              </div>

              {/* Verified Details */}
              <div className="space-y-3 pt-2 text-sm text-[#050505] dark:text-[#e4e6eb]">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-[#8c949e] shrink-0" />
                  <span>Works at <strong>ConnectBook Global Community</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#8c949e] shrink-0" />
                  <span>
                    Lives in <strong>{summary.city}, {summary.region}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#8c949e] shrink-0" />
                  <span>
                    From <strong>{summary.country.name} {summary.country.flag}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#8c949e] shrink-0" />
                  <span className="font-mono text-xs">
                    {summary.phoneE164} <span className="text-[#31a24c] font-semibold">(Verified E.164)</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#8c949e] shrink-0" />
                  <span className="font-mono text-xs">{maskEmail(summary.email)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#8c949e] shrink-0" />
                  <span>
                    Born <strong>{summary.dateOfBirth}</strong> ({summary.calculatedAge} years old)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onEditRegistration}
                className="w-full py-1.5 px-3 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] text-[#050505] dark:text-[#e4e6eb] font-semibold text-sm rounded-md transition-colors cursor-pointer"
              >
                Edit details
              </button>
            </div>

            {/* Photos Preview Card */}
            <div className="bg-white dark:bg-[#242526] rounded-lg shadow-xs border border-[#dadde1] dark:border-[#3a3b3c] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-[#050505] dark:text-[#e4e6eb]">Photos</h3>
                <button type="button" className="text-sm text-[#1877f2] hover:underline cursor-pointer">
                  See all photos
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-tr from-blue-500 to-indigo-500" />
                <div className="aspect-square bg-gradient-to-tr from-emerald-500 to-teal-500" />
                <div className="aspect-square bg-gradient-to-tr from-amber-500 to-orange-500" />
                <div className="aspect-square bg-gradient-to-tr from-purple-500 to-pink-500" />
                <div className="aspect-square bg-gradient-to-tr from-sky-500 to-cyan-500" />
                <div className="aspect-square bg-gradient-to-tr from-rose-500 to-red-500" />
              </div>
            </div>
          </div>

          {/* Right Column: Post Composer & Timeline */}
          <div className="lg:col-span-7 space-y-4">
            {/* Create Post Card */}
            <div className="bg-white dark:bg-[#242526] rounded-lg shadow-xs border border-[#dadde1] dark:border-[#3a3b3c] p-4">
              <form onSubmit={handleCreatePost}>
                <div className="flex items-center gap-2.5 pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      `${summary.firstName[0]}${summary.lastName[0]}`
                    )}
                  </div>
                  <input
                    type="text"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder={`What's on your mind, ${summary.firstName}?`}
                    className="flex-1 h-10 px-4 rounded-full bg-[#f0f2f5] dark:bg-[#3a3b3c] text-sm text-[#050505] dark:text-[#e4e6eb] placeholder:text-[#65676b] dark:placeholder:text-[#b0b3b8] focus:outline-none"
                  />
                  {newPostText.trim() && (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-xs rounded-full cursor-pointer"
                    >
                      Post
                    </button>
                  )}
                </div>

                <hr className="border-[#dadde1] dark:border-[#3a3b3c] my-1" />

                <div className="grid grid-cols-3 pt-1 text-xs sm:text-sm font-semibold text-[#65676b] dark:text-[#b0b3b8]">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-md cursor-pointer"
                  >
                    <Video className="w-5 h-5 text-[#f3425f]" />
                    <span className="hidden sm:inline">Live video</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-md cursor-pointer"
                  >
                    <ImageIcon className="w-5 h-5 text-[#45bd62]" />
                    <span>Photo/video</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-md cursor-pointer"
                  >
                    <Smile className="w-5 h-5 text-[#f7b125]" />
                    <span className="hidden sm:inline">Feeling/activity</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Posts Timeline */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-[#242526] rounded-lg shadow-xs border border-[#dadde1] dark:border-[#3a3b3c] p-4 space-y-3"
                >
                  {/* Post Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-sm overflow-hidden">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          `${summary.firstName[0]}${summary.lastName[0]}`
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#050505] dark:text-[#e4e6eb]">
                          {summary.firstName} {summary.lastName}
                        </h4>
                        <p className="text-xs text-[#65676b] dark:text-[#b0b3b8] flex items-center gap-1">
                          <span>{post.time}</span>
                          <span>·</span>
                          <Globe className="w-3 h-3" />
                        </p>
                      </div>
                    </div>
                    <button type="button" className="p-1 text-[#65676b] hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] rounded-full">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm text-[#050505] dark:text-[#e4e6eb] leading-relaxed">
                    {post.text}
                  </p>

                  {/* Reactions Summary */}
                  <div className="flex items-center justify-between text-xs text-[#65676b] dark:text-[#b0b3b8] pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-[10px]">
                        👍
                      </span>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex gap-3">
                      <span>4 comments</span>
                      <span>1 share</span>
                    </div>
                  </div>

                  <hr className="border-[#dadde1] dark:border-[#3a3b3c]" />

                  {/* Post Actions: Like, Comment, Share */}
                  <div className="grid grid-cols-3 text-xs sm:text-sm font-semibold text-[#65676b] dark:text-[#b0b3b8]">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors ${
                        post.liked ? "text-[#1877f2]" : ""
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.liked ? "fill-[#1877f2]" : ""}`} />
                      <span>Like</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 py-1.5 rounded-md hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 py-1.5 rounded-md hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c] cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
