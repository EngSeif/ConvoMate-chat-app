/**
 * SidebarSkeleton - A skeleton loader for the sidebar, simulating loading contacts.
 * 
 * This component renders a skeleton loader UI for the sidebar, mimicking the layout of contact items.
 * It is used to provide a loading state while the actual data (contacts) is being fetched.
 * The skeleton consists of an avatar and placeholder text for each contact, displayed as loading placeholders.
 * 
 * @returns {JSX.Element} The skeleton loader for the sidebar.
 */
const SidebarSkeleton = () => {
    // Create 8 skeleton items representing the loading state of contacts
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside
            className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
        >
            {/* Header - Displaying the "Contacts" title and icon */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            {/* Skeleton Contacts - A list of skeleton items simulating loading contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* Avatar skeleton - Circular placeholder for the user avatar */}
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full" />
                        </div>

                        {/* User info skeleton - Placeholder for the user's name and status, visible only on larger screens */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2" />
                            <div className="skeleton h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
