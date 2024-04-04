import SwiftUI

struct ContentView: View {
    @State private var isLoggedIn = false
    
    var body: some View {
        if isLoggedIn {
            DashboardView()
        } else {
            LoginView(isLoggedIn: $isLoggedIn)
        }
    }
}

struct LoginView: View {
    @Binding var isLoggedIn: Bool
    
    var body: some View {
        VStack {
            Spacer()
            Text("Welcome")
                .font(.largeTitle)
                .bold()
            Spacer()
            SocialLoginButton(platform: "Facebook") {
                isLoggedIn = true
            }
            SocialLoginButton(platform: "Google") {
                isLoggedIn = true
            }
            Spacer()
        }
        .padding()
    }
}

struct SocialLoginButton: View {
    var platform: String
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: "person.fill")
                    .foregroundColor(.white)
                Text("Login with \(platform)")
                    .foregroundColor(.white)
                    .bold()
            }
            .padding()
            .background(Color.blue)
            .cornerRadius(10)
        }
        .padding(.horizontal)
    }
}

struct DashboardView: View {
    let categories = ["Family", "Friends", "Others"]
    
    var body: some View {
        NavigationView {
            List(categories, id: \.self) { category in
                NavigationLink(destination: DetailView(category: category)) {
                    Text(category)
                        .bold()
                }
            }
            .navigationTitle("Dashboard")
            .toolbar {
                NavigationLink(destination: AddPersonView()) {
                    Image(systemName: "plus")
                        .foregroundColor(.black)
                }
            }
        }
    }
}

struct DetailView: View {
    var category: String
    let mockData = [
        "Family": ["Name": "John Doe", "Money": "$100", "Tasks": "Buy groceries", "UserTasks": "Call on birthday", "ImageURL": "https://unsplash.com/photos/2LowviVHZ-E"],
        "Friends": ["Name": "Jane Smith", "Money": "$50", "Tasks": "Organize party", "UserTasks": "Send invitation", "ImageURL": "https://unsplash.com/photos/BXCZi9smw78"],
        "Others": ["Name": "Sam Wilson", "Money": "$0", "Tasks": "None", "UserTasks": "None", "ImageURL": "https://unsplash.com/photos/3ZUsNJhi_Ik"]
    ]
    
    var body: some View {
        VStack(alignment: .leading) {
            AsyncImage(url: URL(string: mockData[category]?["ImageURL"] ?? "")) { image in
                image.resizable()
            } placeholder: {
                ProgressView()
            }
            .frame(width: 200, height: 200)
            .clipShape(Circle())
            .shadow(radius: 10)
            
            Text("Name: \(mockData[category]?["Name"] ?? "N/A")")
            Text("Money: \(mockData[category]?["Money"] ?? "N/A")")
            Text("Tasks: \(mockData[category]?["Tasks"] ?? "N/A")")
            Text("Your Tasks: \(mockData[category]?["UserTasks"] ?? "N/A")")
        }
        .padding()
        .navigationTitle("\(category) Details")
    }
}

struct AddPersonView: View {
    @State private var name: String = ""
    @State private var moneyOwed: String = ""
    @State private var tasks: String = ""
    @State private var userTasks: String = ""
    @State private var selectedCategory: String = "Family"
    @State private var showingImagePicker = false
    @State private var inputImage: UIImage?
    @State private var profileImage: Image? = Image("placeholder") // Assuming "placeholder" is the default image name
    let categories = ["Family", "Friends", "Others"]
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Person Details")) {
                    TextField("Name", text: $name)
                    TextField("Amount Owed", text: $moneyOwed)
                    TextField("Tasks for Them", text: $tasks)
                    TextField("Tasks for You", text: $userTasks)
                    Picker("Category", selection: $selectedCategory) {
                        ForEach(categories, id: \.self) {
                            Text($0)
                        }
                    }
                    VStack {
                        if let profileImage = profileImage {
                            profileImage
                                .resizable()
                                .scaledToFill()
                                .frame(width: 200, height: 200)
                                .clipShape(Circle())
                                .overlay(Circle().stroke(Color.white, lineWidth: 5))
                                .shadow(radius: 10)
                        }
                        Button("Select Image") {
                            showingImagePicker = true
                        }
                        .sheet(isPresented: $showingImagePicker, onDismiss: loadImage) {
                            ImagePicker(image: $inputImage)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top)
                }
            }
            .navigationTitle("Add Person")
            .toolbar {
                Button("Save") {
                    // Logic to save the person's details goes here
                }
            }
        }
    }
    
    func loadImage() {
        guard let inputImage = inputImage else { return }
        profileImage = Image(uiImage: inputImage)
    }
}

struct ImagePicker: UIViewControllerRepresentable {
    @Binding var image: UIImage?
    
    func makeUIViewController(context: Context) -> some UIViewController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        var parent: ImagePicker
        
        init(_ parent: ImagePicker) {
            self.parent = parent
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let uiImage = info[.originalImage] as? UIImage {
                parent.image = uiImage
            }
            
            picker.dismiss(animated: true)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
