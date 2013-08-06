require 'factory_girl'

FactoryGirl.define do
  factory :alpine_workfile, aliases: [:work_flow] do
    owner
    workspace
    description 'A nice description'
    file_name 'machine_learning.afm'
    association :execution_location, :factory => :gpdb_database
  end

  factory :workfile do
    owner
    workspace
    description 'A nice description'
    file_name 'workfile.doc'
  end

  factory :chorus_workfile do
    owner
    workspace
    additional_data ''
    description 'A nice description'
    file_name 'chorus_workfile.doc'
  end

  factory :workfile_version do
    association :workfile, :factory => :chorus_workfile
    version_num '1'
    owner
    commit_message 'Factory commit message'
    modifier
  end

  factory :workfile_draft do
    association :workfile, :factory => :chorus_workfile
    owner
    content 'Excellent content'
  end
end
