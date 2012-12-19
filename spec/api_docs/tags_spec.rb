require 'spec_helper'

resource 'Tags' do
  let(:owner) { users(:owner) }
  let(:workfile) { workfiles("sql.sql") }

  before do
    log_in owner
  end

  post '/taggings' do
    parameter :entity_id, 'Id of the associated object'
    parameter :entity_type, 'Type of the associated object, e.g. Workfile'
    parameter :'tag_names[]', 'Tag names (100 characters or less)'

    required_parameters :entity_id, :entity_type, :'tag_names[]'

    let(:entity_id) { workfile.to_param }
    let(:entity_type) { 'Workfile' }
    let(:'tag_names[]') { ['alpha', 'omega'] }

    example_request 'Set tags for a workfile' do
      status.should == 201
    end
  end

  get '/taggings' do
    parameter :query, 'String to search tags for'
    pagination

    let(:query) { "something" }

    example_request 'Search tags' do
      status.should == 200
    end
  end
end