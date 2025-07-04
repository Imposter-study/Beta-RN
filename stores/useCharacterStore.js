import { create } from "zustand";

const useCharacterStore = create((set) => ({
  title: "", // 제목
  description: "", // 상세설명
  character_image: null, // 캐릭터 이미지
  name: "", // 이름
  character_info: "", // 설명
  intro: [], // 첫 상황
  example_situation: [], // 상황 예시
  presentation: "", // 소개글?
  hashtags: [], // 해시태그
  creator_comment: "", // 크리에이터 코멘트
  is_character_public: true,
  is_description_public: true,
  is_example_public: true,

  // 내용 설정
  setTitle: (newTitle) => set({ title: newTitle }),
  setDescription: (newDescription) => set({ description: newDescription }),
  setName: (newName) => set({ name: newName }),
  setCharacterInfo: (newCharacterInfo) =>
    set({ character_info: newCharacterInfo }),
  setImage: (newImage) => set({ character_image: newImage }),
  setPresentation: (newPresentation) => set({ presentation: newPresentation }),

  // 인트로 설정
  setIntro: (newIntro) =>
    set((state) => ({ intro: [...state.intro, newIntro] })),
  deleteIntro: (id) =>
    set((state) => ({
      intro: state.intro.filter((element) => element.id !== id),
    })),
  editIntro: (id, newMessage) =>
    set((state) => ({
      intro: state.intro.map((item) =>
        item.id === id ? { ...item, message: newMessage } : item
      ),
    })),

  // 소개 설정
  // 해시태그 설정
  setHashtag: (newHashtag) =>
    set((state) => ({ hashtags: [...state.hashtags, newHashtag] })),
  deleteHashtag: (idx) =>
    set((state) => ({
      hashtags: state.hashtags.filter((_, index) => idx !== index),
    })),
  // 크리에이터 코멘트
  setCreatorComment: (newComment) => set({ creator_comment: newComment }),
  // 공개여부 설정
  setCharacterPublic: () =>
    set((state) => ({
      is_character_public: !state.is_character_public,
      is_description_public: !state.is_description_public,
      is_example_public: !state.is_example_public,
    })),
  setDescriptionPublic: () =>
    set((state) => ({
      is_description_public: !state.is_description_public,
    })),
  setExamplePublic: () =>
    set((state) => ({
      is_example_public: !state.is_example_public,
    })),

  // 상황예시 설정
  setExampleSituation: (newSituation) =>
    set((state) => ({
      example_situation: [...state.example_situation, newSituation],
    })),
  deleteExampleSituation: (idx) =>
    set((state) => ({
      example_situation: state.example_situation.filter(
        (_, index) => index !== idx
      ),
    })),
  updateExampleSituation: (idx, updatedSituation) =>
    set((state) => ({
      example_situation: state.example_situation.map((situation, index) =>
        index === idx ? updatedSituation : situation
      ),
    })),

  // 캐릭터 수정
  editIntro: (originalIntro) => set({ intro: originalIntro }),
  editExampleSituation: (originalSituation) =>
    set({ example_situation: originalSituation }),
  editHashtags: (originalHashtags) => set({ hashtags: originalHashtags }),

  // 내용 초기화 함수
  resetCharacter: () =>
    set({
      title: "", // 제목
      description: "", // 상세설명
      character_image: null, // 캐릭터 이미지
      name: "", // 이름
      character_info: "", // 설명
      intro: [], // 첫 상황
      example_situation: [], // 상황 예시
      presentation: "", // 소개글?
      hashtags: [], // 해시태그
      creator_comment: "", // 크리에이터 코멘트
    }),
}));

export default useCharacterStore;
