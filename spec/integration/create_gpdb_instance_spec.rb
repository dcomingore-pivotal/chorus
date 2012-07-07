require File.join(File.dirname(__FILE__), 'spec_helper')

describe " add an instance " do
  before(:each) do
    login('edcadmin', 'secret')
  end

  it "creates an instance" do
    new_instance_name = "GPDB_inst_sel_test#{Time.now.to_i}"
    create_gpdb_gillette_instance(:name => new_instance_name)
    verify_instance_name(new_instance_name)
  end
end
