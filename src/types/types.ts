type TaskProperties = {
    name: string;
    description?: string;
    assignees?: number[];
    groupAssignees?: number[];
    tags?: string[];
    status?: string;
    priority?: number;
    dueDate?: Date;
    isDueDateTime?: boolean;
    timeEstimate?: number;
    startDate?: Date;
    isStartDateTime?: boolean;
    sprintPoints?: number;
    notifyAll?: boolean;
    subTasks?: TaskProperties[];
    isArchived?: boolean;
};

type TaskOptions = {
    team?: string;
    space?: string;
    list?: string;
    folder?: string;
    teamId?: string;
    spaceId?: string;
    listId?: string;
    folderId?: string;
};

type TeamProperties = {
    id: string;
    name: string;
};

type TeamOptions = {
    teamId?: string;
    name?: string;
};

type SpaceProperties = {
    id: string;
    name: string;
    teamId?: string;
    statuses: SpaceTaskStatus[];
    isArchived: boolean;
};

type SpaceTaskStatus = {
    id?: string;
    status: string;
    orderIndex: number;
    type: string;
};

type SpaceOptions = {
    spaceId?: string;
    name?: string;
    teamName?: string;
    teamId?: string;
};

type FolderProperties = {
    id: string;
    name: string;
    spaceId: string;
};

type FolderOptions = {
    folderId?: string;
    name?: string;
    spaceId?: string;
    spaceName?: string;
    teamId?: string;
    teamName?: string;
};

type ListProperties = {
    id: string;
    name: string;
    spaceId: string;
    folderId: string;
    status: SpaceTaskStatus;
    isArchived: boolean;
};

type ListOptions = {
    listId?: string;
    name?: string;
    spaceId?: string;
    spaceName?: string;
    isFolderless?: boolean;
    folderId?: string;
    folderName?: string;
    teamId?: string;
    teamName?: string;
};

export {
    TaskProperties,
    TaskOptions,
    TeamProperties,
    TeamOptions,
    SpaceProperties,
    SpaceTaskStatus,
    SpaceOptions,
    FolderProperties,
    FolderOptions,
    ListProperties,
    ListOptions,
};
