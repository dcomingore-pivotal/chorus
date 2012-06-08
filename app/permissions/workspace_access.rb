class WorkspaceAccess < DefaultAccess
  def self.workspaces_for(current_user)
    if current_user.admin?
      Workspace.scoped
    else
      Workspace.accessible_to(current_user)
    end
  end

  def self.members_for(user, workspace)
    if user.admin?
      workspace.members
    else
      workspace.members_accessible_to(user)
    end
  end

  def self.member_of_workspaces(user)
    user.workspaces
  end

  def show?(workspace)
    workspace.public || member_edit?(workspace)
  end

  def workfile_change?(workspace)
    !workspace.archived? && (member_edit?(workspace) || administrative_edit?(workspace))
  end

  def member_edit?(workspace)
    workspace.members.include?(current_user)
  end

  def administrative_edit?(workspace)
    workspace.owner == current_user
  end
end
